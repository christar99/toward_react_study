import { useNavigate } from "react-router-dom";
import { openIndexedDB } from "../utils/indexedDB";
import useWriteInput from "../hooks/useWriteInput";

import Title from "../components/Title";
import WriteForm from "../components/WriteForm";

function WriteBoard() {
  const navigator = useNavigate();
  const { textarea, writerInput, titleInput } = useWriteInput();

  const savePost = () => {
    if (
      textarea.current === null ||
      writerInput.current === null ||
      titleInput.current === null
    ) {
      return;
    }

    const content = textarea.current.value;
    const writer = writerInput.current.value;
    const title = titleInput.current.value;
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (writer === "") {
      alert("작성자를 입력해주세요.");
      return;
    }
    if (content.length < 10) {
      alert("10글자이상 작성해주세요.");
      return;
    }
    openIndexedDB("POST", {
      key: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      writer: writer.trim(),
      hit: 0,
    });
    alert("저장되었습니다.");
    navigator("/");
  };

  return (
    <div className="w-144 flex flex-col gap-2 relative">
      <Title name="글쓰기" goBackButton={true} />
      <WriteForm
        textarea={textarea}
        titleInput={titleInput}
        writerInput={writerInput}
      />
      <div className="flex justify-end">
        <button
          className="w-14 px-2 py-1 border border-slate-600 rounded text-slate-600"
          onClick={savePost}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default WriteBoard;
