import { SideMenu } from "@skbkontur/side-menu";
import {
  DocTextIcon24Regular,
  SettingsGearIcon24Regular,
  FaceAHappyIcon24Regular,
  BuildingHomeIcon16Regular,
} from "@skbkontur/icons";
import { MenuItem } from "@skbkontur/react-ui";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();
  return (
    <SideMenu>
      <SideMenu.Header konturLogo={<span>Remember</span>} onClick={() => navigate("/")} />
      <SideMenu.Body>
        <SideMenu.Item
          icon={<BuildingHomeIcon16Regular />}
          caption={"Главная"}
          onClick={() => navigate("/")}
        ></SideMenu.Item>
        <SideMenu.Item
          icon={<DocTextIcon24Regular />}
          caption={"Все карточки"}
          onClick={() => navigate("/list")}
        ></SideMenu.Item>
        <SideMenu.Item
          icon={<FaceAHappyIcon24Regular />}
          caption={"Тренироваться"}
          onClick={() => navigate("/training")}
        />
        <SideMenu.Item icon={<SettingsGearIcon24Regular />} caption={"Настройки"} />
        <SideMenu.Avatar userName={"Толстиков Вова"}>
          <MenuItem href={"https://cabinet.kontur.ru"} target="_blank">
            Личный кабинет
          </MenuItem>
          <MenuItem>Безопасность</MenuItem>
          <SideMenu.Divider />
          <MenuItem>Выйти</MenuItem>
        </SideMenu.Avatar>
      </SideMenu.Body>
    </SideMenu>
  );
};
