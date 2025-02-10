// app/page.js
import CountMate from './component/countmate';
export const metadata = {
    title: "Count Mate - Timer & Counter that Speaks Out Loud",
    description: "Count Mate is a timer and counter app that speaks the count aloud and tracks progress visually. Perfect for time-based tasks and motivation.",
    keywords: "timer app, counter app, speech synthesis, productivity tool, interval timer, time management, aung ko myint",
  };
  
export default function Page() {
  return (
    <div>
      <CountMate />
    </div>
  );
}
