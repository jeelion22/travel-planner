# ReUniteME (Frontend)

ReuniteME is a web application designed to facilitate the reunion of person with mental health issues and individuals in endangered situations with their families.

## Table of Contents

- [Introduction](#introduction)
- [Users of the Application](#contributions)
- [Technolgies Used](#technologies-used)
- [Application Link](#application-link)
- [Application Images](#application-images)
- [Installation](#installation)
- [Contribution](#contributing)
- [Usage](#usage)
- [License](#license)

## Introduction

The application supports two types of user registrations: Community Contributor and Reunite Seeker (families and friends searching for lost family members).

## Users of the application

#### Community Contributor

To create an account as a Community Contributor, users need to provide basic details including their official names, a valid email address, and phone number. Upon successful registration, users can take a picture of a person who needs to be reunited (such as person with mental health issues and those in endangered situations), ensuring that location services are enabled in the camera settings. The size of the uploaded picture should not exceed 5MB. It's important to note that uploads from social media shared photographs should be avoided as they do not contain location metadata.

Community Contributors can perform CRUD operations on their contributions while respecting the privacy of individuals involved.

#### Reunite Seeker

To create an account as a Reunite Seeker, users must provide additional information such as a valid current address, a type of government-approved ID, and the ID number. This information helps verify their identity and enables officials to contact them regarding the individuals in need.

Upon successful registration, users can access information about individuals in need of reunification. If they locate their family member, they can submit a response form. After successful submission, the individual's location is revealed. Upon visiting the location and confirming their status, users can update their status. Once the individual is recovered, the location becomes permanently inaccessible to other users, and contributors are notified.

#### Admins

The application includes admins with varying permission levels. The root admin has full accessibility to the application, including creating new admins, updating user information, and managing contributions. Other admins have restricted permissions based on their assigned levels of access.

## Technologies Used

- **React**: Used as the main frontend library for building user interfaces.
- **React Router DOM**: Used for routing within the React application.
- **Bootstrap**: Used for styling and responsive design components.
- **Axios**: Used for making HTTP requests to the server.
- **Formik**: Used for building and managing forms with React.
- **Yup**: Used for form validation with Formik.
- **React International Phone**: Used for international phone number input handling.
- **React Phone Number Input**: Used for phone number input handling.
- **React Paginate**: Used for pagination in lists of data.
- **Recharts**: Used for creating charts and graphs in the application.
- **Font Awesome Icons**: Used for adding icons to the user interface.

## Application Link

[ReUniteME](https://reuniteme.netlify.app/)

## Application Images

The below images are about how our web application looks like.

![Homepage](/src/assets/img1.png)

![User registration](/src/assets/img2.png)

![User register as community uploader](/src/assets/img3.png)

![User register as reunite seeker](/src/assets/img4.png)

![User forgot password link](/src/assets/img5.png)

![Admin login](/src/assets/img7.png)

![Admin forgot password](/src/assets/img6.png)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jeelion22/reuniteME-Frontend.git
   cd ReuniteME-Frontend

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

## Contributing

Contributions are crucial to enhancing the security, reliability, and functionality of ReuniteME. Your input can help integrate features such as collaboration with government organizations to verify the identities of Reunite Seekers, ensuring credibility and instant verification through authorized bodies, and partnering with asylums to provide support if individuals are not rescued, prioritizing their privacy and safety.

### Goals of Contributions

- **Enhanced Security**: Implement measures to protect the privacy and safety of mentally ill and endangered individuals.
- **Reliability**: Improve the application's reliability through bug fixes and performance enhancements.
- **Feature Expansion**: Add new features that facilitate efficient reunification processes and enhance user experience.

### How You Can Contribute

1. **Code Contributions**: Help develop new features, fix bugs, and optimize performance.
2. **Documentation**: Improve documentation to make it more accessible and comprehensive.
3. **Testing**: Contribute by testing the application and reporting issues or bugs.
4. **Feedback**: Provide feedback on usability, functionality, and potential improvements.

### Guidelines

- **Respect Privacy**: Ensure all contributions prioritize the privacy and safety of individuals involved.
- **Collaboration**: Work together with the community and maintain open communication.
- **Quality Assurance**: Follow best practices for code quality, security, and performance.

Your contributions are valued and essential in making ReuniteME a secure and reliable platform for reuniting families and ensuring the well-being of individuals in need.

## License

MIT License

---
