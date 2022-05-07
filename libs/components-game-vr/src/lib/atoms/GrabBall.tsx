import {useGrab} from '@helper';
import {Sphere} from '@react-three/drei';
import {SyntheticEvent, useEffect, useRef} from 'react';


const GrabBall = () => {
  const {ref, isGrabbed} = useGrab();
  const recognition = useRef(new SpeechRecognitionAlternative());
  useEffect(() => {
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString('#JSGF V1.0; grammar commands; public <commands> = grab | release ;', 1);
    recognition.current.grammars = speechRecognition.currentList;
    recognition.current.continuous = true;
    recognition.current.lang = 'en-US';
    recognition.current.interimResults = true;
    // recognition.current.maxAlternatives = 1;
    recognition.current.start();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    recognition.current.onresult = (event) => {
      const command = event.results[0][0].transcript;
      console.log({command, event: event.results, ref});
      if (isGrabbed) {
        if (command === 'release') {
        // is grabbed, release
        }
      } else if (command === 'grab') {
        // is not grabbed, might grab if target matches ref
      }
    };
  }, [isGrabbed]);
  return <Sphere args={[.1, 64, 64]} ref={ref}>
    <meshBasicMaterial color={isGrabbed ? 'red' : 'hotpink'} />
  </Sphere>;
};

GrabBall.displayName = 'GrabBall';
export {GrabBall};
