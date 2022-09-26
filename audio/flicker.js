import * as THREE from "three";
import metaversefile from "metaversefile";
const { useApp, useCamera, useCleanup } = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, "$1");

export default () => {
  const app = useApp();
  const camera = useCamera();

  const listener = new THREE.AudioListener();
  camera.add(listener);

  // create a global audio source
  const sound = new THREE.Audio(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(
    baseUrl + "/sounds/Dying Light Bulb-SoundBible.com-742005847.mp3",
    function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(1);
      sound.play();
    }
  );

  useCleanup(() => {
    sound.stop();
  });

  return app;
};
