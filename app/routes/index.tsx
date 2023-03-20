import { VideoUploader } from "../components/VideoUploader";
import { VideoList } from "../components/VideoList";
import { RecoilRoot } from "recoil";

export default function Index() {
  return (
    <RecoilRoot>
      <div>
        <VideoUploader />
        <VideoList />
      </div>
    </RecoilRoot>
  );
}
