# RateMyCSClass

## Overview

RateMyCSClass is a web application designed to help NYU students make informed decisions about computer science classes by providing detailed, student-generated reviews and ratings. Unlike platforms that focus solely on professor reviews, RateMyCSClass centers on the classes themselves, offering insights into aspects like difficulty, workload, and learning value. This focus allows students to evaluate classes based on past student experiences, enabling them to choose classes that best align with their academic goals and learning preferences.

Through RateMyCSClass, students can browse a comprehensive catalog of computer science classes, view aggregate ratings, and read detailed reviews. Registered users can also contribute their own feedback, rate classes they've taken, and engage in a community of peers with similar academic interests. The platform's goal is to create a reliable resource for students navigating NYU's CS curriculum, fostering a more transparent and informed class selection process.


## Data Model

The application will store Users, Classes, and Reviews, along with a relationship between them to maintain review contributions and ratings.

* Users can submit multiple Reviews and rate multiple Classes.
* Each Class can have multiple Reviews associated with it.
* Each Review includes a reference to the Class and User who submitted it.

An Example User:

```javascript
{
  username: "savinachan",
  email: "sc8881@nyu.edu",
  password: // a password hash,
  reviews: // an array of references to Review documents
}
```

An Example Class:

```javascript
{
  classCode: "CSCI-UA 467",
  title: "Applied Internet Technology",
  reviews: // an array of references to Review documents,
  averageRating: 5.0 // aggreggate rating based on submitted reviews
}
```

An Example Review:

```javascript
{
  user: // a reference to a User object,
  class: // a reference to a Class object,
  semesterTaken: "Fall 2024",
  professor: "Joe Versoza",
  rating: 5,
  difficulty: 3,
  workload: 4,
  learningValue: 5,
  grade: "A",
  timeSpentWeekly: 10, // approximate hours per week,
  comment: "This class gave a strong foundation in web development skills with practical, hands-on projects."
}
```

## [Link to Commented First Draft Schema](src/db.mjs) 

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. As non-registered user, I can register a new account with the site.
2. As a user, I can log in to the site.
3. As a user, I can browse a list of all available computer science courses.
4. As a user, I can view detailed information and reviews for a specific course.
5. As a user, I can submit a new review for a course I've taken.

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](src/app.mjs) 

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)
