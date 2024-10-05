import classNames from "./AppHeader.module.css";
import skniLogo from "../../assets/skni_logo.svg";

const AppHeader: React.FC = () => {
    return (
        <header className={classNames.root}>
            <img className={classNames.logo} src={skniLogo} alt="Logo SKNI" height={51} width={76} />
            <h1>Czujniki UMCS</h1>
        </header>
    );
};

export default AppHeader;
