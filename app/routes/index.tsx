import { VideoUploader } from "../components/VideoUploader";
import { VideoList } from "../components/VideoList";

export default function Index() {
  return (
    <div>
      <VideoUploader />
      <VideoList />
    </div>
  );
}
