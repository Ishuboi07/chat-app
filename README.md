# Hangout 👋

Hangout is a web-based messaging and video calling application built using **Next.js**. It leverages **Stream SDK** for chat and video functionalities, **Clerk** for authentication, and **Gemini** for AI chatbot integration. This app provides features like real-time messaging, group chats, video calling, and an AI chatbot for user interactions.

## Features

### Chat

- **Typing Indicators**: See when someone is typing.
- **Message Replies**: Reply to specific messages in a conversation.
- **Reactions**: Add emoji reactions to messages.
- **Photo & File Upload**: Share images and documents.
- **Group Chats**: Start group conversations with multiple users.
- **Seen & Online Indicators**: Know when messages are read and when users are online.

### Video Calling (Yoom)

- **Schedule Meetings**: Schedule and join video meetings.
- **Record Meetings**: Save meeting recordings for future reference.
- **Screen Sharing**: Share your screen with others during a call.
- **Custom Layouts**: Change the layout view (e.g., grid or speaker view).
- **Reactions**: Send reactions during a video call.
- **In-Call Chat**: Send messages while in a call.

### AI Chatbot

- **Gemini Chatbot**: Interact with an AI chatbot that assists with queries and provides automated responses.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **UI Components**: [Shadcn UI](https://shadcn.dev/)
- **Chat & Video Calling**: [Stream SDK](https://getstream.io/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **AI Chatbot**: [Gemini](https://ai.google.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## System Architecture

- **Authentication**: Handled by **Clerk**. After authentication, the user's details are sent to **Stream**, where a token is generated for accessing chat and video functionalities.
- **Messaging & Video Calls**: All chat messages, video call sessions, and user data are managed and stored by **Stream SDK**. No external database is used as all data is stored in **Stream**.
- **Frontend deployment**: The app is deployed on **Vercel** for it's frontend

## Getting Started

### Prerequisites

- **Node.js** installed on your machine
- **NPM** (or **Yarn**)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ishuboi07/chat-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chat-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root of the project and add the necessary API keys for **Clerk**, **Gemini** and **Stream SDK** you can check out `.env.example` file for reference:

### Running the App

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Deployment

The app is deployed on **Vercel**. To deploy it yourself, follow these steps:

1. Link the project to your Vercel account.
2. Set up the environment variables in Vercel.
3. Deploy the app via Vercel's dashboard.

### Testing the application:

You can see the deployed version here: [Deployed Website](https://hangout.ishaanagarwal.xyz/)

Please sign in with:

- Username: tester
- Password: tester@imbesideyou

### Design Document

Here is the design document: [Link to design document](https://docs.google.com/document/d/17o_3HwYCRx70qochgLVgM6FSVhc_uXcqjbwTpMxMxHQ/edit?usp=sharing)

## Owner details

This project is built by:

- **Name**: Ishaan Agarwal
- **University**: IIT BHU Varanasi
- **Department**: Ceramic Engineering

### Contact

- **Linkedin**: [Ishaan Agarwal](https://www.linkedin.com/in/ishaan-agarwal-2a6a2b221/)
- **Email**: ishaan.agarwal.cer21@iitbhu.ac.in
