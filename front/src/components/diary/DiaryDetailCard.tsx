import { useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";
import { DiaryTypes } from "../../stores/DiaryAtom";
import { DiaryForm } from "../../styles/diary/DiaryCreate";
import {
  DiaryDetailBtn,
  DiaryDetailCardAlignStyled,
  DiaryDetailText,
} from "../../styles/diary/DiaryDetailCard";
import * as Api from "../../api";
import dayjs from "dayjs";
import { Route, useNavigate, useParams } from "react-router";
import { ROUTES } from "../../enum/routes";

export interface DiaryPropsTypes {
  id: number;
  title: string;
  description: string;
  date: string;
  diarys: DiaryTypes[];
  setDiarys: SetterOrUpdater<DiaryTypes[]>;
}

export interface booleanProps {
  toggle: boolean;
  toggleHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type ClickHandler = (props: boolean) => (e: React.MouseEvent) => void;
type ClickDelete = (props: boolean) => (e: React.MouseEvent) => void;

const onSubmitDiary = () => {
  alert("제출이 완료되었습니다.");
};

const DiaryDetailCard = ({
  date,
  title,
  description,
  diarys,
  setDiarys,
}: DiaryPropsTypes): JSX.Element => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [diaryDate, setDiaryDate] = useState(date);
  const [diaryTitle, setDiaryTitle] = useState(title);
  const [diaryDescription, setDiaryDescription] = useState(description);
  const { detail } = useParams();
  const currentTime = dayjs();
  const navigator = useNavigate();

  const ClickHandler: ClickHandler = (props) => (e) => {
    e.preventDefault();
    setIsEdit(!props);
    const DiaryDetailPost = async () => {
      const response = await Api.put(`diaries/${detail}`, {
        date: currentTime.format("YYYY-MM-DD"),
        title: diaryTitle,
        description: diaryDescription,
      });
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        console.log(response.data.data);
      }
    };
    DiaryDetailPost();
  };
  const clickDelete = () => {
    const diaryDelete = async () => {
      const response = await Api.delete(`diaries/${detail}`);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        console.log(response.data.data);
      }
    };
    if (window.confirm("삭제하시겠습니까?")) {
      diaryDelete();
      navigator(ROUTES.DIARY.ROOT);
    }
  };

  useEffect(() => {
    const diaryDetailGet = async () => {
      const response = await Api.get(`diaries/${detail}`);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        setDiaryTitle(response.data.data.title);
        setDiaryDescription(response.data.data.description);
        setDiaryDate(response.data.data.date);
      }
    };
    diaryDetailGet();
  }, [detail]);

  if (!isEdit) {
    return (
      <>
        <DiaryDetailCardAlignStyled>
          <DiaryDetailText>
            <p>{diaryDate}</p>
            <h2>{diaryTitle}</h2>
            <p>{diaryDescription}</p>
          </DiaryDetailText>

          <DiaryDetailBtn>
            <button className="gray-btn" onClick={clickDelete}>
              DELETE
            </button>
            <button className="gray-btn" onClick={ClickHandler(isEdit)}>
              EDIT
            </button>
          </DiaryDetailBtn>
        </DiaryDetailCardAlignStyled>
      </>
    );
  } else {
    return (
      <>
        <DiaryDetailCardAlignStyled>
          <div>
            <DiaryForm onSubmit={onSubmitDiary}>
              <input
                maxLength={20}
                placeholder="Title"
                value={diaryTitle}
                onChange={(e) => {
                  setDiaryTitle(e.target.value);
                }}
              />
              <br />
              <textarea
                placeholder="Write about your day..."
                value={diaryDescription}
                onChange={(e) => {
                  setDiaryDescription(e.target.value);
                }}
              />
            </DiaryForm>
          </div>
          <DiaryDetailBtn>
            <button className="gray-btn">DELETE</button>
            <button className="gray-btn" onClick={ClickHandler(isEdit)}>
              SAVE
            </button>
          </DiaryDetailBtn>
        </DiaryDetailCardAlignStyled>
      </>
    );
  }
};

export default DiaryDetailCard;
