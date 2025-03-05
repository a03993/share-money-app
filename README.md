# ShareMoney

ShareMoney is a React-based application designed for easy bill splitting. The primary goal is to allow users to create expense lists and assign participants without requiring any login. At the end of the process, the app calculates and displays who owes money to whom.

## Features

- **No Login Required**: Users can add expenses and participants without the hassle of creating an account.
- **Bill Splitting**: Automatically calculates the amounts to be paid between participants.
- **Link Sharing**: Users can create unique links to share with others, enabling collaborative expense tracking without affecting other shared links.
- **Persistent Storage**: Data is stored using MongoDB Atlas, ensuring users can access their expense records across sessions.

## Tech Stack

![React](https://img.shields.io/badge/React-%2320232a?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-%230081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-%2361DAFB?style=for-the-badge&logo=mongodb&logoColor=white)

- **Frontend**: React.js with Material-UI (MUI) components for a sleek and responsive design.
- **Backend**: Node.js with Express.js, connected to MongoDB Atlas for data persistence.
- **Database**: MongoDB Atlas, a cloud-hosted database service.
- **Deployment**:
  - **Frontend**: Hosted on Netlify.
  - **Backend**: Hosted on Render.
  
## Deployment

You can access the live application here: [ShareMoney](https://share-money-2025.netlify.app/)

>**Note:**  
> Currently, the live application is a static front-end and is not connected to the backend. To fully use the application, you need to run the project locally. Please follow the **Installation** steps below.

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/a03993/share-money-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd share-money-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   node server/index.js
   npm start
   ```
5. Open your browser and visit `http://localhost:3000` to use the app locally.

## Figma Design

The UI design for ShareMoney was created using Figma. You can view and explore the design here: [ShareMoney Figma Design](https://www.figma.com/design/wf5gIxDnxbsqw491AKW6NV/%E3%80%90web%E3%80%91ShareMoney?node-id=3-5&t=2w08SarPRj1BhKNX-1)

## Future Enhancements

- Backend deployment on Netlify
- Multi-currency support for international users
- Integration with external financial tools (e.g., bank accounts, PayPal)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue with your suggestions or bug reports.

---

Enjoy seamless bill splitting with ShareMoney!

