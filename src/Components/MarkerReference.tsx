function MarkerReference() {
    return (
      <div style={{position: 'fixed', left: '5vh'}}>
        <p>Ponto sorteado:</p>
        <div style={{ width: '5vh', height: '5vh', backgroundColor: 'rgb(155, 40, 0)' }} />
        <p>Ponto vencedor:</p>
        <div style={{ width: '5vh', height: '5vh', backgroundColor: 'rgb(44, 120, 55)' }}/>
        <p>Pontos competidos:</p>
        <div style={{ width: '5vh', height: '5vh', backgroundColor: 'rgb(150, 210, 120)' }}/>
      </div>
    )
}

export default MarkerReference