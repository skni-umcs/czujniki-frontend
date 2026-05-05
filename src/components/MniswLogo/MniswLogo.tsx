import { useTheme } from "../../contexts/themeContext";
import mniswLogoLight from "../../assets/mnisw_light.png";
import mniswLogoDark from "../../assets/mnisw_dark.png";
import mniswLogoMono from "../../assets/mnisw_mono.png";

interface IProps {
    className?: string;
    height?: number;
    width?: number;
}

const MniswLogo: React.FC<IProps> = ({ className, height, width }) => {
    const { actualTheme } = useTheme();

    let logo = mniswLogoLight;
    if (actualTheme === "dark") logo = mniswLogoDark;
    if (actualTheme === "highContrast") logo = mniswLogoMono;

    return (
        <img
            className={className}
            src={logo}
            height={height}
            width={width}
            alt="Logo Ministerstwa Nauki i Szkolnictwa Wyższego"
        />
    );
};

export default MniswLogo;
