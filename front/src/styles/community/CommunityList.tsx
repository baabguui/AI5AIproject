import styled from "styled-components";

export const CommunityListAlignStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  .community-link{
    text-decoration:none;
    color:black;
  }
`;

export const CommunityCardAlignStyled = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 0 4%;
  margin-bottom: 5%;
  width: 80%;
  img {
    border-radius: 50px;
    width: 40px;
  }
  li {
    list-style: none;
  }

  @media (min-width: 1500px) {
    width: 1200px;
  }
`;

export const CommunityInfo = styled.div`
  ul {
    padding: 0;
    display: flex;
  }
  ul li {
    padding: 10px;
  }
`;

export const CommunityWriteBtnStyled = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    width: 165px;
    height: 42px;
    padding: 10px 15px;
    gap: 2px;
    background: #ffffff;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }
`;

export const CommunitySortBtnStyled = styled.div`
  padding-top: 2%;
  display: grid;
  grid-template-columns: 150px 150px;
  align-items:start;
  button {
    margin-left: 0%;
    width: 121px;
    height: 42px;
    align-items: center;
    padding: 0px 15px;
    gap: 2px;
    background: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: none;

    cursor: pointer;
    :hover {
      background: #d6d6d6;
    }
  }
  @media (min-width: 1500px) {
    padding-left: 20%;
  }
`;

export const CommunityAllAlignStyled = styled.div`
  display: flex;
  align-items:center;
  flex-direction:column;
`;
