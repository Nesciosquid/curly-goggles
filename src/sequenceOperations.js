export const getBasePair = (base) => {
  switch (base) {
    case ('A'):
      return 'T';
    case ('T'):
      return 'A';
    case ('G'):
      return 'C';
    case ('C'):
      return 'G';
    default:
      return undefined;
  }
};

export const getReverseComplement = (sequence) => {
  let revComp = '';
  for (let i = sequence.length - 1; i >= 0; i--) {
    revComp += getBasePair(sequence.charAt(i));
  }
  return revComp;
};

export const findAllOligoIndices = (sequence, oligo) => {
  console.log(oligo);
  if (oligo === '' || sequence === '') {
    return [];
  }
  const test = RegExp(oligo, 'g');
  const indices = [];
  let result = test.exec(sequence);
  while (result) {
    indices.push(result.index);
    result = test.exec(sequence);
  }
  return indices;
};

const doAreasOverlap = (highlightA, highlightB) => {
  if (highlightB.start <= highlightA.end) {
    return true;
  } return false;
};

const condenseHighlights = (highlights) => {
  const condensed = [];
  let last;
  highlights.forEach(highlight => {
    if (last && doAreasOverlap(last, highlight)) {
      last.end = highlight.end;
    } else {
      condensed.push(highlight);
      last = highlight;
    }
  });
  return condensed;
};

export const getHighlghtedAreas = (sequence, oligo) => {
  const indices = findAllOligoIndices(sequence, oligo);
  const reverseIndices = findAllOligoIndices(sequence, getReverseComplement(oligo));
  const forwardHighlightedAreas = [];
  const reverseHighlightedAreas = [];
  indices.forEach(index => {
    forwardHighlightedAreas.push({
      start: index,
      end: index + oligo.length,
    });
  });
  reverseIndices.forEach(index => {
    reverseHighlightedAreas.push({
      start: index,
      end: index + oligo.length,
    });
  });
  const condensedForward = condenseHighlights(forwardHighlightedAreas);
  const condensedReverse = condenseHighlights(reverseHighlightedAreas);
  return {
    forward: condensedForward,
    reversed: condensedReverse,
  };
};

export const getHightlightStrings = (sequence, oligo) => {
  const highlights = getHighlghtedAreas(sequence, oligo);
  let currentIndex = 0;
  const highStrings = [];
  highlights.forward.forEach(highlight => {
    if (highlight.start > currentIndex) {
      highStrings.push({
        seq: sequence.slice(currentIndex, highlight.start),
        highlight: 'none',
      });
      currentIndex = highlight.start;
    }
    highStrings.push({
      seq: sequence.slice(currentIndex, highlight.end),
      highlight: 'forward',
    });
    currentIndex = highlight.end;
  });
  if (currentIndex < sequence.length) {
    highStrings.push({
      seq: sequence.slice(currentIndex, sequence.length),
      highlight: 'none',
    });
  }
  return highStrings;
};

export const cutSeqWithOligo = (sequence, oligo) => {
  const indices = findAllOligoIndices(sequence, oligo);
  const start = new Date().getMilliseconds();
  const splitSeq = sequence.split(oligo);
  const revComp = getReverseComplement(oligo);
  let secondSplit = [];
  splitSeq.forEach((subsequence) => {
    const subSplits = subsequence.split(revComp);
    secondSplit = secondSplit.concat(subSplits);
  });
  const cuts = secondSplit.length - 1;
  const end = new Date().getMilliseconds();
  const time = end - start;
  return ({
    cuts,
    time,
    fragments: secondSplit,
  });
};
