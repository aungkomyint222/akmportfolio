'use client'
import React, { useState, useEffect } from 'react';
import { Brain, ChevronRight, RotateCcw, Award, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import questions from "../data/questions.json";
import Link from 'next/link'; // Import Link from next

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [traits, setTraits] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [careerMatch, setCareerMatch] = useState(null);

  const handleOptionClick = async (selectedTraits) => {
    const updatedTraits = { ...traits };
    Object.entries(selectedTraits).forEach(([trait, score]) => {
      updatedTraits[trait] = (updatedTraits[trait] || 0) + score;
    });
    setTraits(updatedTraits);

    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);
      setShowResult(true);
      const scores = getSortedTraits(updatedTraits);
      try {
        const result = await callHuggingFaceSpace(scores.toString());
        setCareerMatch(result);
      } catch (error) {
        console.error("Error getting career match:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getSortedTraits = (traitScores = traits) => {
    const orderedTraits = [
      'analytical', 'technical', 'methodical', 'creative', 'innovative',
      'adaptable', 'social', 'leadership', 'empathetic', 'detail_oriented', 'stress_tolerant'
    ];
    return orderedTraits.map((trait) => traitScores[trait] || 0);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setTraits({});
    setShowResult(false);
    setCareerMatch(null);
  };

  const callHuggingFaceSpace = async (scores) => {
    try {
      // Step 1: Send a POST request to initiate the prediction and get the EVENT_ID
      const postResponse = await fetch("https://aungkomyint-jobmatch.hf.space/gradio_api/call/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [scores], // Send the input data as an array
        }),
      });
  
      // Log the response status and content
      console.log("POST Response Status Code:", postResponse.status);
      const postResponseText = await postResponse.text();
      console.log("POST Response Content:", postResponseText);
  
      if (postResponse.ok) {
        try {
          const postResult = JSON.parse(postResponseText); // Parse the JSON response
  
          // Check if we have the event_id in the response
          if (postResult.event_id) {
            const eventId = postResult.event_id;
            console.log("Event ID:", eventId);
  
            // Step 2: Use the EVENT_ID to make a GET request and fetch the result
            const getResponse = await fetch(`https://aungkomyint-jobmatch.hf.space/gradio_api/call/predict/${eventId}`);
  
            // Log the GET response content
            console.log("GET Response Status Code:", getResponse.status);
            const getResponseText = await getResponse.text();
            console.log("GET Response Content:", getResponseText);
  
            if (getResponse.ok) {
              // Check if the response starts with 'event: complete'
              if (getResponseText.startsWith("event: complete")) {
                const result = getResponseText.split("\ndata: ")[1]; // Extract the data part
                console.log("Prediction Result:", result);
                return result; // Return the result
              } else {
                console.log("Unexpected response format");
                return null;
              }
            } else {
              console.error(`Error: ${getResponse.status}`);
              return null;
            }
          } else {
            console.error("Event ID not found in response");
            return null;
          }
        } catch (e) {
          console.error("Error parsing JSON response:", e);
          return { error: "Failed to parse JSON response from POST request" };
        }
      } else {
        console.error(`Error: ${postResponse.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: "Failed to get response from Hugging Face Space" };
    }
  };

  if (showResult) {
    const scores = getSortedTraits();
    const orderedTraits = [
      'analytical', 'technical', 'methodical', 'creative', 'innovative',
      'adaptable', 'social', 'leadership', 'empathetic', 'detail_oriented', 'stress_tolerant',
    ];

    // Format the career match string by removing brackets and quotes
    const formatCareerMatch = (match) => {
      if (!match) return null;
      // Remove brackets, quotes, and extract just the job title
      const cleanMatch = match
        .replace(/[\[\]"]/g, '') // Remove brackets and quotes
        .replace('Recommended Job: ', ''); // Remove the prefix
      return cleanMatch;
    };

    const chartData = orderedTraits.map((trait, index) => ({
      name: trait.charAt(0).toUpperCase() + trait.slice(1).replace('_', ' '),
      score: scores[index]
    }));

    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-2 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
              <p className="text-lg text-gray-600">Analyzing your responses...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-6">
                <Award className="w-12 h-12 text-indigo-600 mr-1" />
                <h1 className="text-2xl font-bold text-gray-900">Recommended Career</h1>
              </div>

              {careerMatch && (
                <div className="bg-indigo-50 rounded-lg mb-8 p-4">
                 
                  <div className="text-center">
                    <p className="text-2xl text-indigo-700 font-semibold">
                      {formatCareerMatch(careerMatch)}
                    </p>
                    <p className="text-lg text-indigo-600 mt-2">
                      Based on your unique combination of skills and traits
                    </p>
                  </div>
                </div>
              )}

              {/* Rest of the component remains the same */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Trait Profile</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                      />
                      <YAxis 
                        ticks={[0, 3, 6, 9, 12]} 
                        domain={[0, 12]}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        dot={{ fill: "#4F46E5", r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {orderedTraits.map((trait, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {trait.charAt(0).toUpperCase() + trait.slice(1).replace('_', ' ')}
                      </span>
                      <span className="text-indigo-600 font-bold">{scores[index]}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(scores[index] / Math.max(...scores)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={resetQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Take Quiz Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Rest of your existing Quiz component code remains the same
  const currentQuestion = questions.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-2 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Brain className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-xl font-bold text-gray-900">Career Compass</h1>
          <div className="text-sm text-gray-500 ml-auto">
  <span>Powered by </span>
  <Link href="https://huggingface.co/spaces/aungkomyint/jobmatch" passHref className="text-indigo-600 hover:text-indigo-800">
   akm's ai
  </Link>
</div>
        </div>

       
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Question {currentQuestionIndex + 1} of {questions.questions.length}
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.traits)}
              className="w-full group flex items-center text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            >
              <span className="flex-grow text-gray-700 group-hover:text-indigo-900">
                {option.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}