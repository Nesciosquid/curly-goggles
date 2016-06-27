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

const isInHighlight = (highlight, index) => {
  if (highlight.start <= index && highlight.end >= index) {
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
      end: index + oligo.length - 1,
    });
  });
  reverseIndices.forEach(index => {
    reverseHighlightedAreas.push({
      start: index,
      end: index + oligo.length - 1,
    });
  });
  const condensedForward = condenseHighlights(forwardHighlightedAreas);

  const condensedReverse = condenseHighlights(reverseHighlightedAreas);
  return {
    forward: condensedForward,
    reversed: condensedReverse,
  };
};

export const getHighlightStatus = (index, forward, rev) => {
  let f = false;
  let r = false;
  if (forward) {
    forward.forEach((highlight) => {
      if (isInHighlight(highlight, index)) {
        f = true;
      }
    });
  }
  if (rev) {
    rev.forEach((highlight) => {
      if (isInHighlight(highlight, index)) {
        r = true;
      }
    });
  }
  return {
    forward: f,
    reverse: r,
  };
};

export const statusesAreEqual = (stat1, stat2) => (
  (stat1 && stat2 && stat1.forward === stat2.forward
    && stat1.reverse === stat2.reverse)
);

export const getHightlightStrings = (sequence, oligo) => {
  const highlights = getHighlghtedAreas(sequence, oligo);
  let curStart = 0;
  let curStatus = undefined;
  const highStrings = [];

  for (let i = 0; i < sequence.length; i++) {
    const newStat =
      getHighlightStatus(i, highlights.forward, highlights.reversed);
    if (!statusesAreEqual(curStatus, newStat)) {
      if (curStatus) {
        const curString = sequence.slice(curStart, i);
        highStrings.push({
          seq: curString,
          forward: curStatus.forward,
          reverse: curStatus.reverse,
        });
      }
      curStart = i;
    }
    curStatus = newStat;
    if (i === sequence.length - 1) {
      const curString = sequence.slice(curStart);
      highStrings.push({
        seq: curString,
        forward: curStatus.forward,
        reverse: curStatus.reverse,
      });
    }
  }
  return highStrings;
};

export const cutSeqWithOligo = (sequence, oligo) => {
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
