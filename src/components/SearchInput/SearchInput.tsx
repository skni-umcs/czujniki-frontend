import { useEffect, useRef, useState } from "react";
import { MdOutlineClose, MdOutlineSearch } from "react-icons/md";
import { Form } from "react-router-dom";
import styles from "./SearchInput.module.css";
import IconButton from "../IconButton/IconButton";

interface IProps {
    currentValue?: string;
};

const SearchInput: React.FC<IProps> = ({ currentValue }) => {
    const searchFormRef = useRef<HTMLFormElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const lastSearchState = useRef<string>("");
    const [inputValue, setInputValue] = useState<string>(currentValue ?? "");

    useEffect(() => {
        if (!searchInputRef.current || searchInputRef.current.value === currentValue) return;
        searchInputRef.current.value = currentValue ?? "";
    }, [currentValue]);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (lastSearchState.current == event.target.value) return;
        setInputValue(event.target.value);
        const tempState = lastSearchState.current;
        await new Promise(resolve => setTimeout(resolve, 500));

        if (lastSearchState.current !== tempState) return;
        lastSearchState.current = event.target.value;
        searchFormRef.current?.requestSubmit();
    };

    const handleReset = () => {
        if (!searchInputRef.current || !searchFormRef.current) return;
        setInputValue("");
        searchFormRef.current.reset();
        searchFormRef.current.requestSubmit();
    };

    return (
        <Form method="get" className={styles.root} ref={searchFormRef}>
            <MdOutlineSearch className={styles.searchIcon} size={18} />
            <input
                name="q"
                type="search"
                placeholder="Szukaj..."
                autoComplete="off"
                ref={searchInputRef}
                className={styles.searchBar}
                onChange={e => void handleSearchChange(e)}
            />
            {inputValue.length > 0 && (
                <IconButton
                    className={styles.clearIcon}
                    onClick={handleReset}
                    type="reset"
                    title="Wyczyść"
                >
                    <MdOutlineClose size={18} />
                </IconButton>
            )}
        </Form>
    );
};

export default SearchInput;
