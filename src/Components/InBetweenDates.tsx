import { useState, useEffect } from 'react';
import { raffle } from './MapDoneRaffles';

type DateDeclare = {
    start: {
      day: number,
      month: string,
      year: number,
      hour: string,
      minute: string,
      second: string,
    },
    end: {
      day: number,
      month: string,
      year: number,
      hour: string,
      minute: string,
      second: string,
    }
  }

  type prop = {
    raffle: raffle,
  }
  
  type Months = {
    [index: number]: string;
  }

function InBetweenDates({raffle}: prop) {
  const [date, setDate] = useState<DateDeclare | null>(null);

  function numberToMonthString(monthNumber: number) {
    const meses: Months = {
      0: 'Janeiro', 1: 'Fevereiro', 2: 'Março',
      3: 'Abril', 4: 'Maio', 5: 'Junho',
      6: 'Julho', 7: 'Agosto', 8: 'Setembro',
      9: 'Outubro', 10: 'Novembro', 11: 'Dezembro'
    };
    return meses[monthNumber];
  }
    useEffect(() => {
        const monthS = new Date(raffle.drawnStart).getMonth();
        const monthE = new Date(raffle.drawnEnd).getMonth();
        setDate({ 
          start: {
            day: new Date(raffle.drawnStart).getDate(),
            month: numberToMonthString(monthS),
            year: new Date(raffle.drawnStart).getFullYear(),
            hour: new Date(raffle.drawnStart).getHours().toString().padStart(2, '0'),
            minute: new Date(raffle.drawnStart).getMinutes().toString().padStart(2, '0'),
            second: new Date(raffle.drawnStart).getSeconds().toString().padStart(2, '0'),
          },
          end: {
            day: new Date(raffle.drawnEnd).getDate(),
            month: numberToMonthString(monthE),
            year: new Date(raffle.drawnEnd).getFullYear(),
            hour: new Date(raffle.drawnEnd).getHours().toString().padStart(2, '0'),
            minute: new Date(raffle.drawnEnd).getMinutes().toString().padStart(2, '0'),
            second: new Date(raffle.drawnEnd).getSeconds().toString().padStart(2, '0'),
        }});
      }, [setDate, raffle.drawnEnd, raffle.drawnStart])
    return (
        <div>
            <h2>Resultado para o periodo entre:</h2>
            <h3>{ `Inicio - ${date?.start.day} de ${date?.start.month} de ${date?.start.year} ás ${date?.start.hour}:${date?.start.minute}:${date?.start.second}`}</h3>
            <h3>{ `Fim - ${date && date.end.day} de ${date && date.end.month} de ${date && date.end.year} ás ${date?.end.hour}:${date?.end.minute}:${date?.end.second} `}</h3>   
        </div>
    )
};

export default InBetweenDates;