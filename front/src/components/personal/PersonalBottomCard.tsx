import { ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  PBCardAlignStyled,
  PBCardItemStyled,
  PBCardTabStyled,
  PBCardWordAlignStyled,
  PBCWordItemStyled,
} from "../../styles/personal/PersonalBottomCardStyled";
import PBCardData, { PBCardDataType } from "./personalData";
import { CloudEmp, CloudFull } from "../../assets/index";
import * as Api from "../../api";
import { BackBtnStyled } from "../../styles/common/CommonBtn";
import { DiaryDetailBtn } from "../../styles/diary/DiaryDetailCard";

export interface PBCardItemType {
  userId: number;
  description: { expression: string[]; res: boolean };
  searchWord: string[];
  grammar: string[];
}

const PersonalBottomCard = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState<PBCardDataType>(PBCardData);

  const [cloud, setCloud] = useState(true);
  const [translate, setTranslate] = useState(true);
  const [id, setId] = useState("");
  const [searchword, setSearchword] = useState("");

  const tabList = ["Expressions", "Words"];

  const tabClickHandler = (index: any) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const getPersonalData = async () => {
      const response = await Api.get(`main/getSearch`);
      if (response.status !== 200) {
        console.log(response);
      } else {
        console.log(response.data);
        setItems(response.data);
        setSearchword(response.data);
      }
    };
    const getId = async () => {
      const response = await Api.get("main/getSearch");
      response.data.forEach((data: any) => {
        console.log(data.searchId);
        setId(data.searchId);
      });
      if (response.status !== 200) {
        console.log(response);
      } else {
        console.log(response.data.searchId);
      }
    };
    getId();
    getPersonalData();
  }, [cloud]);
  const handleSaveSearch = async () => {
    let searchId = "";
    try {
      // console.log("가져오기 성공");
      if (window.confirm("삭제하시겠습니까")) {
        try {
          console.log(searchId);
          const res = await Api.delete(`main/deleteSearch/${id}`);
          console.log(res);
          console.log("삭제 성공");
        } catch (err) {
          console.log("삭제 실패");
        }
      }
    } catch (err) {
      console.log("가져오기 실패");
    }
  };
  const expressionItem = () => {
    const expression = items.map((res: any) => {
      return (
        <>
          <PBCardItemStyled>{res.description}</PBCardItemStyled>
        </>
      );
    });
    return <PBCardWordAlignStyled>{expression}</PBCardWordAlignStyled>;
  };
  const wordsItem = () => {
    const wordsList = items.map((res) => (
      <PBCWordItemStyled>{res.searchWord}</PBCWordItemStyled>
    ));

    return <PBCardWordAlignStyled>{wordsList}</PBCardWordAlignStyled>;
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          Expressions
        </li>
      ),
      tabCont: <div>{expressionItem()}</div>,
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          Words
        </li>
      ),
      tabCont: <div>{wordsItem()} </div>,
    },
  ];

  return (
    <>
      <PBCardAlignStyled>
        <div>
          <PBCardTabStyled>
            <ul className="tabs is-boxed">
              {tabList.map((tab, index) => (
                <li
                  className={activeIndex === index ? "is-active" : ""}
                  onClick={() => tabClickHandler(index)}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <ul>
              <button className="btn-go-search">
                <a href="/">
                  Go Search <ArrowRightOutlined />
                </a>
              </button>
            </ul>
          </PBCardTabStyled>

          <div>{tabContArr[activeIndex].tabCont}</div>
        </div>
      </PBCardAlignStyled>
    </>
  );
};

export default PersonalBottomCard;
