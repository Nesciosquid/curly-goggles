export const cutSeqWithOligo = (sequence, oligo) => {
  const start = new Date().getMilliseconds();
  const splitSeq = sequence.split(oligo);
  const end = new Date().getMilliseconds();
  const time = end - start;
  const cuts = splitSeq.length - 1;
  return ({
    time,
    cuts,
    fragments: splitSeq,
  });
};
