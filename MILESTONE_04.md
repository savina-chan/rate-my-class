Milestone 04 - Final Project Documentation
===

NetID
---
sc8881

Name
---
Savina Chan

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-savina-chan

URL for deployed site 
---
http://linserv1.cims.nyu.edu:12189/

URL for form 1 (from previous milestone) 
---
http://linserv1.cims.nyu.edu:12189/create-class (must be logged in to submit)

Special Instructions for Form 1
---
1. Use the following credentials to [log in](http://linserv1.cims.nyu.edu:12189/login):
    * Username: test
    * Password: test
2. After logging in, you will be redirected to the [home page](http://linserv1.cims.nyu.edu:12189/).
3. On the home page, you will see a button labeled `Create a Class`.
4. Click the `Create a Class` button, and you will be redirected to the [create a class form](http://linserv1.cims.nyu.edu:12189/create-class).
5. On the [create a class form](http://linserv1.cims.nyu.edu:12189/create-class), you can fill out the form to create a new class.
7. After submitting, you will be redirected back to the [home page](http://linserv1.cims.nyu.edu:12189/). Use the search bar to verify your newly created class is listed in the search results.

URL for form 2 (for current milestone)
---
http://linserv1.cims.nyu.edu:12189/csci-ua-467/rate (must be logged in to submit)

Special Instructions for Form 2
---
1. On the [home page](http://linserv1.cims.nyu.edu:12189/), use the search bar to search for the class `CSCI-UA 467 - Applied Internet Technology`, which has already been pre-created for testing.
2. Click on the class from the search results. This will redirect you to the [class details page](http://linserv1.cims.nyu.edu:12189/csci-ua-467).
3. On the [class details page](http://linserv1.cims.nyu.edu:12189/csci-ua-467), you will see a `Post a Review` button. Click on it to be redirected to the [create a review form](http://linserv1.cims.nyu.edu:12189/csci-ua-467/rate).
4. Fill out the review on the [create a review form](http://linserv1.cims.nyu.edu:12189/csci-ua-467/rate) and submit your review.
5. After submitting, you will be redirected back to the [class details page](http://linserv1.cims.nyu.edu:12189/csci-ua-467), where you will see your new review along with any existing reviews.

URL for form 3 (from previous milestone) 
---
http://linserv1.cims.nyu.edu:12189/csci-ua-467/ (must be logged in and created a review) -> your review -> `Edit` button.

Special Instructions for Form 3
---
1. After submitting a review using the [create a review form](http://linserv1.cims.nyu.edu:12189/csci-ua-467/rate), you will be redirected to the [class details page](http://linserv1.cims.nyu.edu:12189/csci-ua-467). Locate the review you created and click the `Edit` button. Please ensure you are logged into the same account that created the review.
2. Clicking the `Edit` button will redirect you to a form similar to the [create a review form](http://linserv1.cims.nyu.edu:12189/csci-ua-467/rate) but prefilled with the information from your review. The URL for the edit form is structured as: `http://linserv1.cims.nyu.edu:12189/csci-ua-467/edit-review/:reviewId`.
3. After making your changes and submitting the form, you will be redirected back to the [class details page](http://linserv1.cims.nyu.edu:12189/csci-ua-467). The updates to your review will be displayed there.

First link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-savina-chan/blob/7ba6a264806dac70329949809b054ad8785d691d/frontend/src/pages/ClassPage.jsx#L138-L208

Second link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-savina-chan/blob/7ba6a264806dac70329949809b054ad8785d691d/frontend/src/components/SearchBar.jsx#L53-L61

Short description for links above
---
1. The `map` function is a higher-order function (HOF) used to iterate over the `reviews` array and render each review as a styled `div` element. It transforms the array of review objects into a corresponding array of React components, allowing each review's data (e.g., professor, semester, grade, and metrics) to be displayed dynamically on the page. This function also conditionally renders `Edit` and `Delete` buttons for reviews created by the logged-in user, based on the `userId`.
2. The `map` function is a higher-order function (HOF) used to iterate over the `filteredClasses` array and dynamically render each class as a clickable `li` element. It transforms the filtered array of class objects into a list of React components. Each list item displays the class code and title, and clicking on a list item invokes the `handleClassClick` function to navigate to the class's details page. This enhances the interactivity and responsiveness of the search feature.

Link to github line number(s) for schemas (db.js or models folder)
---
[db.js](/backend/db.js) - Database connection setup.
[models](/backend/models) - Contains Mongoose schemas for `Class`, `Review`, and `User`.

Description of research topics above with points
---
* (6 points) React with Vite: The entire frontend was built using React, a powerful JavaScript library for creating dynamic user interfaces. React's component-based architecture made it easy to modularize the code, manage state, and build reusable components for forms, navigation, and data visualization. Vite was used as the build tool, providing a fast development environment with features like Hot Module Replacement (HMR) and optimized builds. This combination enabled the rapid development of a responsive and interactive application while ensuring a smooth user experience.
* (2 points) Tailwind CSS: Tailwind CSS was used to style the entire frontend with its utility-first approach, allowing for quick and consistent styling directly in the HTML using predefined classes. This eliminated the need for custom CSS files and ensured responsive design across all devices. Tailwind’s flexibility allowed for the customization of colors, spacing, and other design elements, making it easier to align the UI with the application’s theme while maintaining a clean and professional look.
* (2 points) Chart.js: Chart.js, integrated with the `react-chartjs-2` wrapper, was used to create interactive bar charts on the class details page, displaying metrics like average rating, difficulty, workload, and learning value. These charts dynamically update when reviews are added, edited, or deleted, providing users with an intuitive way to understand class statistics. The integration with React enabled seamless updates and re-renders, making Chart.js an effective tool for visualizing data in a user-friendly manner.

Links to github line number(s) for research topics described above (one link per line)
---
* React: [frontend](/frontend)
* Tailwind CSS: [components](/frontend/src/components) and [pages](/frontend/src/pages)
* Chart.js: [ClassPage.jsx](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-savina-chan/blob/7ba6a264806dac70329949809b054ad8785d691d/frontend/src/pages/ClassPage.jsx#L105-L131)

Optional project notes 
--- 
* Ensure you are logged in (use username: `test` and password: `test` or create your own account) to test any features requiring authentication (create, edit, delete).
* Use the pre-created class `CSCI-UA 467 - Applied Internet Technology` for testing review-related features (or create your own class).

Attributions
---
* [React Documentation](https://react.dev/learn) - Used as a reference for React concepts and implementation details, although I had prior knowledge of React; used for [frontend](/frontend).
* [Vite Documentation](https://vite.dev/guide/) - Used to guide the setup and configuration of the Vite build tool; used for [vite.config.js](/frontend/vite.config.js).
* [Chart.js Bar Chart Documentation](https://www.chartjs.org/docs/latest/charts/bar.html) - Referenced for implementing and customizing bar charts for data visualization; used for [ClassPage.jsx](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-savina-chan/blob/7ba6a264806dac70329949809b054ad8785d691d/frontend/src/pages/ClassPage.jsx#L105-L131).
* [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - Used for initial setup and reference for utility classes; used for [components](/frontend/src/components) and [pages](/frontend/src/pages).
* [NerdCave Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) - Utilized as a quick reference to speed up styling decisions; used for [components](/frontend/src/components) and [pages](/frontend/src/pages).