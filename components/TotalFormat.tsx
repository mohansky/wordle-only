export default function ScoreTotal({ total }: any) {
    return (<span>{Number((total/6*100).toFixed(2))}</span>);
  }