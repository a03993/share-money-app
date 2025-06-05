# ShareMoney

A simple and intuitive bill splitting tool that allows multiple users to track shared expenses and settle up without the need for login or registration—just share a link and start splitting.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Explore the App](#explore-the-app)
- [Getting Started](#getting-started)
- [Author](#author)

## Features

-  Create shareable links to start tracking group expenses  
-  Choose who paid and who shared each expense  
-  Automatically split costs between participants  
-  Tab navigation synced with the URL for better UX  
-  Clean and responsive UI design 

## Tech Stack

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-ffffff?logo=shadcn/ui&logoColor=black)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Heroicons](https://img.shields.io/badge/Heroicons-8B5CF6?logo=heroicons&logoColor=white)](https://heroicons.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Routing**: React Router

## Explore the App

<p align="center">
  <img width="200" alt="home" src="https://github.com/user-attachments/assets/0f732346-af99-4e4f-9bbe-6f37139871bf" />
  <img width="200" alt="expense_page" src="https://github.com/user-attachments/assets/0737e7db-e8d1-4543-a4a0-8ec515d0f315" />
  <img width="200" alt="settlement_page" src="https://github.com/user-attachments/assets/5217e8a4-a4f0-41c5-b1d9-974a91bed6ed" />
  <img width="200" alt="create_user" src="https://github.com/user-attachments/assets/7982c114-1444-4fff-a8e7-e5f4c8521a61" />
</p>

> 🎨 Check out the [Figma design](https://www.figma.com/design/wf5gIxDnxbsqw491AKW6NV/ShareMoney?node-id=3-5&p=f&t=bmlN2nxEf5uqFQSf-0) – fully designed by myself from scratch.

1. [Home Page](https://share-money-app.vercel.app/)

- Create a new session with a shareable link.
- If no users exist, you'll be prompted to create the first one.

2. [Expense Page](https://share-money-app.vercel.app/lets-shared-on-ErrqufIoMy)
   
- Add expenses with Payer, Item, Price, and Share By.
- See all expenses, total participants, and total cost.
- Quickly create users via the Payer/Share By fields.

3. [Settlement Page](https://share-money-app.vercel.app/lets-shared-on-ErrqufIoMy)

- View average cost per person and who owes whom.
- Mark payments as settled—once done, no new expenses can be added.

4. Create User Modal

- Add users on the fly when assigning payers or participants.

## Getting Started
To run this project locally:
```bash
# 1. Clone the repository
git clone https://github.com/a03993/share-money-app.git
cd share-money-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open your browser and go to: `http://localhost:5173`

> Note: This app requires the [Share Money API](https://github.com/a03993/share-money-api) to be running locally.

## Author

Tina Chiu [@a03993](https://github.com/a03993)

If you have any suggestions, questions, or feedback — feel free to open an issue or contribute!
