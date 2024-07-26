"use client";

import styles from "../../styles/page.module.css";
import {useState} from "react";

export default function Home() {
    let [player, setPlayer] = useState('X');
    let [winner, setWinner] = useState('');

    const checkWinner = () => {
        const table = []
        for (let i = 0; i < 9; i++) {
            table.push(document.getElementById(i).innerText)
        }

        for (let h = 0; h <= 6; h += 3) {
            if(table[h] == table[h+1] && table[h+1] == table[h+2] && table[h] != "") {
                setWinner(table[h])

                return true
            }
        }

        for (let v = 0; v < 3; v ++) {
            if(table[v] == table[v+3] && table[v+6] == table[v+3] && table[v] != "") {
                setWinner(table[v])

                return true
            }
        }

        if(table[0] == table[4] && table[0] == table[8] && table[0] != "") {
            setWinner(table[0])

            return  true
        }

        if(table[2] == table[4] && table[4] == table[6] && table[6] != "") {
            setWinner(table[2])

            return true
        }

        //0 1 2
        //3 4 5
        //6 7 8
        let filled = 0

        for(let x = 0; x < 9; x ++) {
            if(table[x] != ""){
                filled+=1
            }
        }
        if(filled == 9){
            setWinner("Ninguém")
            return true
        }

        return false
    }

    const gameClick = (possiton) => {
        const element = document.getElementById(possiton);

        if( element.innerText === ""  && !checkWinner() ) {
            player === 'X' ? setPlayer("O") : setPlayer("X");

            element.innerText = player;
            checkWinner()
        }
    }

    const gameGenerator = Array.from({ length: 9 }, (_, index) => (
        <p className={styles.p} id={index} onClick={() => gameClick(index)}></p>
    ));

    const reset = () => {
        for(let i = 0; i < 9; i++) {
            const element = document.getElementById(i)
            element.innerText = "";
            setWinner("");
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {gameGenerator}
            </div>
            {winner && <h1 className={styles.h1}>{winner} é o VENCEDOR</h1>}
            <input className={styles.btn} onClick={reset} type="button" value="RESET"/>
        </main>
    );
};
