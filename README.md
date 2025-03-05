# ShareMoney

ShareMoney is a React-based application designed for easy bill splitting. The primary goal is to allow users to create expense lists and assign participants without requiring any login. At the end of the process, the app calculates and displays who owes money to whom.

## Features

- **No Login Required**: Users can add expenses and participants without the hassle of creating an account.
- **Bill Splitting**: Automatically calculates the amounts to be paid between participants.
- **Link Sharing**: Users can create unique links to share with others, enabling collaborative expense tracking without affecting other shared links.
- **Persistent Storage**: Data is stored using MongoDB Atlas, ensuring users can access their expense records across sessions.

## Tech Stack

- **Frontend**: React.js with Material-UI (MUI) components for a sleek and responsive design.
- **Backend**: Node.js with Express.js, connected to MongoDB Atlas for data persistence.
- **Database**: MongoDB Atlas, a cloud-hosted database service.
- **Deployment**:
  - **Frontend**: Hosted on Netlify.
  - **Backend**: Hosted on Render.
  

## Deployment

You can access the live application here: [ShareMoney](https://share-money-2025.netlify.app/)

## Figma Design

The UI design for ShareMoney was created using Figma. You can view and explore the design here: [ShareMoney Figma Design](https://www.figma.com/design/wf5gIxDnxbsqw491AKW6NV/%E3%80%90web%E3%80%91ShareMoney?node-id=3-5&t=2w08SarPRj1BhKNX-1)

## Future Enhancements

- Integration with external financial tools (e.g., bank accounts, PayPal)
- Multi-currency support for international users

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

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue with your suggestions or bug reports.

---

Enjoy seamless bill splitting with ShareMoney!

