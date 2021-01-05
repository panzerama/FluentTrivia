Welcome to the "Fluent Forever's SDE Interview - Home Assignment"! :D

If you are reading this, you are one of the few chosen ones, so congratulations on making it this far! We wish you the best of luck in the last steps of your interviewing journey.

# Goals of the assignment

As part of this home assignment, we want you to build a simple Trivia application, using the [Open Trivia API](https://opentdb.com/api_config.php).

The two main goals of this assignment are for you to:
1. Write production level, high quality code (code that is highly maintainable, readable, with no unnecessary noise, proven to work...)
2. Showcase the ability to work anywhere in the stack

These two goals are more important than anything else. If, for example, you need to decide between spending time adding more features (or bells and whistles) to the application or working on any of those goals, prioritize the goals.

You can choose any technology and programming language you desire to complete this assignment, but we really value if you do it
using something that is closer to our tech stack (as we will be able to better evaluate the solution and it shows us that you can learn and adapt).

For reference, our tech stack is composed of:
- TypeScript
- React
- React Native
- React Native Web
- Express
- Aurora PostgreSQL

# Acceptance criteria

- The solution requires a client, a backend and a database
- The backend should wrap the [Open Trivia API](https://opentdb.com/api_config.php)
- No need to support multiple users or authentication
- The Trivia app needs to be specific to one category, but you can choose which category you want (e.g.: Trivia app for "Geography")
- The user should be able to choose "Practice mode" in the client
  - Upon selecting "Practice mode", the user will start a session of 15 trivia questions
  - The 15 trivia questions that the user gets follow the next order:
     1. Questions for which the last answer to the question was incorrect
        - Sort by:
         1. number of total times they have been incorrectly answered (more incorrect answers first)
         2. difficulty (hard first, easy last)
     2. Questions that have never been answered
        - Sort by:
        1. difficulty (easy first, hard last)
     3. Questions for which the last answer to the question was correct
        - Sort by:
         1. number of total times they have been correctly answered (less correct answers first)
         2. difficulty (hard first, easy last)
   - The user can choose the answer to the shown question
   - The app should provide feedback to the user about if the answer was correct or not
     - In case the answer wasn't correct, the app should let the user know which was the correct answer
   - The app should keep showing questions to the user until all of them are answered
   - Once all 15 questions are answered, the user is redirected to the main screen, where she has the option to select "Practice mode" again and again
   - By doing multiple "Practice mode" sessions, the user should be able to practice **all** available questions offered by the Open Trivia API for the chosen category
- As much as possible, we don't want to show a stale version of the questions to the user. By stale version we mean a version that is not the current one offered by the Open Trivia API (e.g.: we show a question that has been deleted, the old version of an updated question...)

# Bonus acceptance criteria

NOTE:
Only consider working on this if you have successfully met the previous acceptance criteria and if you think there's nothing else you can do when it comes to the two main goals of the assignment. None of this is strictly necessary to pass this assignment.
You don't need to work on all the bonus acceptance criteria and you can choose which one/s you want to work on.

- Support multiple users and authentication
- The user can see stats about all questions (how many times they have been answered, number of times correctly answered...)
- The user should be able to choose "Challenge mode" in the client
  - Upon selecting "Challenge mode", the user will start a session containing all questions for the selected category
  - The trivia questions will be sorted randomly
  - The user can choose the answer to the shown question
  - The app should provide feedback to the user about if the answer was correct or not
  - If the selected answer was incorrect, the app should show the correct answer, immediately notify the user that the "Challenge mode" has been failed and go back to the main screen
  - If the user manages to successfully answer all questions, the app should congratulate the user
