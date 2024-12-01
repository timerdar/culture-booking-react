function Seat({row, index, onSeatClick}) {
    return (
        <td 
        onClick={() => onSeatClick(row, index)}
        className="seat"
        ><div class="tooltip">Ряд: {row}, Место: {index}</div></td>
    

);
}

function NonSeat() {
    return <td className="nonseat"></td>;
}

function FirstType({ row, onSeatClick}) {
    const seats = [];
    for (let i = 1; i < 31; i++) {
        if (i === 7 || i === 24) {
            seats.push(<NonSeat key={i}/>);
        } else {
            let key;
            if (i < 7){
                key = i;
            }else if (i > 24){
                key = i - 2;
            }else {
                key = i - 1;
            }
            seats.push(<Seat key={i} index={key} row={row} onSeatClick={onSeatClick}/>);
        }
    }
    return (
        <tr>
            {seats}
        </tr>
    );
}

function SecondType({ row, onSeatClick}){
    const seats = [];
    for (let i = 1; i < 31; i++) {
        if (i < 7 || i > 24) {
            let key;
            if (i < 7){
                key = i;
            }else{
                key = i - 18;
            }
            seats.push(<Seat key={i} index={key} row={row} onClick={onSeatClick}/>);
        } else {
            seats.push(<NonSeat key={i}/>);
        }
    }
    return (
        <tr>
            {seats}
        </tr>
    );
}

function ThirdType({ row, onSeatClick}){
    const seats = [];
    for (let i = 1; i < 31; i++) {
        if (i === 7 || i === 8 || i === 22 || i === 23 | i === 24) {
            seats.push(<NonSeat key={i}/>);
        } else {
            let key;
            if (i < 7){
                key = i;
            }else if(i > 24){
                key = i - 5;
            }else{
                key = i - 2;
            }
            seats.push(<Seat key={i} index={key} row={row} onClick={onSeatClick}/>);
        }
    }
    return (
        <tr>
            {seats}
        </tr>
    );
}

function FourthType({ row, onSeatClick}){
    const seats = [];
    for (let i = 1; i < 31; i++) {
        if (i === 7 || i === 8 || i === 23 | i === 24) {
            seats.push(<NonSeat key={i}/>);
        } else {
            let key;
            if (i < 7){
                key = i;
            }else if(i > 24){
                key = i - 4;
            }else{
                key = i - 2;
            }
            seats.push(<Seat key={i} index={key} row={row} onClick={onSeatClick}/>);
        }
    }
    return (
        <tr>
            {seats}
        </tr>
    );
}

function FifthType({ row, onSeatClick}){
    const seats = [];
    for (let i = 1; i < 31; i++) {
        if ( (i < 5) || (i > 9 && i < 23) || i > 26) {
            let key;
            if (i < 5){
                key = i;
            }else if(i > 26){
                key = i - 8;
            }else{
                key = i - 5;
            }
            seats.push(<Seat  key={i} index={key} row={row} onClick={onSeatClick}/>);
        } else {
            seats.push(<NonSeat key={i}/>);
        }
    }
    return (
        <tr>
            {seats}
        </tr>
    );
}

function SixthType({ row, onSeatClick}){
    const seats = [];
    for (let i = 1; i < 31; i++) {
        if ( (i < 6) || (i > 7 && i < 24) || i > 24) {
            let key;
            if (i < 6){
                key = i;
            }else if(i > 26){
                key = i - 3;
            }else{
                key = i - 2;
            }
            seats.push(<Seat key={i} index={key} row={row} onClick={onSeatClick}/>);
        } else {
            seats.push(<NonSeat key={i}/>);
        }
    }
    return (
        <tr>
            {seats}
        </tr>
    );
}

function Empty({text}){
    return (
        <tr>
            <td class="empty" colSpan={31}>{text}</td>
        </tr>
    );
}

function SeatsPicker({handelSeatClick}) {

    

    return (
        <div class="seats-container">
            <h1>Выбор места</h1>
            <table class="seats-table">
                <thead></thead>
                <tbody>
                    <Empty text={"СЦЕНА"}/>
                    <FirstType row={1} onSeatClick={handelSeatClick}/>
                    <FirstType row={2} onSeatClick={handelSeatClick}/>
                    <FirstType row={3} onSeatClick={handelSeatClick}/>
                    <FirstType row={4} onSeatClick={handelSeatClick}/>
                    <FirstType row={5} onSeatClick={handelSeatClick}/>
                    <SecondType row={6} onSeatClick={handelSeatClick}/>
                    <FirstType row={7} onSeatClick={handelSeatClick}/>
                    <FirstType row={8} onSeatClick={handelSeatClick}/>
                    <FirstType row={9} onSeatClick={handelSeatClick}/>
                    <FirstType row={10} onSeatClick={handelSeatClick}/>
                    <FirstType row={11} onSeatClick={handelSeatClick}/>
                    <FirstType row={12} onSeatClick={handelSeatClick}/>
                    <FirstType row={13} onSeatClick={handelSeatClick}/>
                    <FirstType row={14} onSeatClick={handelSeatClick}/>
                    <FirstType row={15} onSeatClick={handelSeatClick}/>
                    <FirstType row={16} onSeatClick={handelSeatClick}/>
                    <Empty text={" - "}/>
                    <ThirdType row={17} onSeatClick={handelSeatClick}/>
                    <ThirdType row={18} onSeatClick={handelSeatClick}/>
                    <FourthType row={19} onSeatClick={handelSeatClick}/>
                    <Empty text={"БАЛКОН"}/>
                    <SixthType row={20} onSeatClick={handelSeatClick}/>
                    <SixthType row={21} onSeatClick={handelSeatClick}/>
                    <SixthType row={22} onSeatClick={handelSeatClick}/>
                    <SixthType row={23} onSeatClick={handelSeatClick}/>
                    <FifthType row={24} onSeatClick={handelSeatClick}/>
                    <FifthType row={25} onSeatClick={handelSeatClick}/>
                    <FifthType row={26} onSeatClick={handelSeatClick}/>
                    <SixthType row={27} onSeatClick={handelSeatClick}/>
                </tbody>
            </table>
        </div>
    );
}

export default SeatsPicker;