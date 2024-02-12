"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export default function Home() {
  const [status, setStatus] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // console.log("URL DA API", API_URL);
        const response = await axios.get(`${API_URL}/user`);
        setStatus(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Testando app Full Stack</h1>
      <h2>Lista de usuários:</h2>
      {status &&
        status.map((user) => (
          <div key={user._id}>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
    </main>
  );
}
