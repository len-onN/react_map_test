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

  type Prop = {
    raffle: raffle,
  }
  
  type Months = {
    [index: number]: string;
  }

function InBetweenDates({raffle}: Prop) {
  const [date, setDate] = useState<DateDeclare | null>(null);

  function numberToMonthString(monthNumber: number) {
    const month: Months = {
      0: 'Janeiro', 1: 'Fevereiro', 2: 'Março',
      3: 'Abril', 4: 'Maio', 5: 'Junho',
      6: 'Julho', 7: 'Agosto', 8: 'Setembro',
      9: 'Outubro', 10: 'Novembro', 11: 'Dezembro'
    };
    return month[monthNumber];
  }
    useEffect(() => {
        console.log("r start: ", raffle.drawnStart, "r end: ", raffle.drawnEnd);
        const dateStart = new Date(raffle.drawnStart);
        // dateStart.setUTCHours(23, 0, 0, 0);
        const dateEnd = new Date(raffle.drawnEnd);
        // dateEnd.setUTCHours(22, 59, 59, 999);
        console.log("start: ", dateStart, " end: ", dateEnd);
        setDate({ 
          start: {
             day: dateStart.getDate(),
             month: numberToMonthString(dateStart.getMonth()),
             year: dateStart.getFullYear(),
             hour: dateStart.getHours().toString().padStart(2, '0'),
             minute: dateStart.getMinutes().toString().padStart(2, '0'),
             second: dateStart.getSeconds().toString().padStart(2, '0'),
           },
           end: {
             day: dateEnd.getDate(),
             month: numberToMonthString(dateEnd.getMonth()),
             year: dateEnd.getFullYear(),
             hour: dateEnd.getHours().toString().padStart(2, '0'),
             minute: dateEnd.getMinutes().toString().padStart(2, '0'),
             second: dateEnd.getSeconds().toString().padStart(2, '0'),
          }});
      }, [setDate, raffle.drawnEnd, raffle.drawnStart])
    return (
        <div>
            <h2>Resultado para o periodo entre:</h2>
            <h3>{ `Inicio - ${date?.start.day} de ${date?.start.month} de ${date?.start.year} às ${date?.start.hour}:${date?.start.minute}:${date?.start.second}`}</h3>
            <h3>{ `Fim - ${date && date.end.day} de ${date && date.end.month} de ${date && date.end.year} às ${date?.end.hour}:${date?.end.minute}:${date?.end.second} `}</h3>   
        </div>
    )
};

export default InBetweenDates;