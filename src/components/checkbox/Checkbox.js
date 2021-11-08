export default function Checkbox({ id, handleClick, isChecked, className, onClick }) {
    return (
        <input
            id={id}
            type="checkbox"
            onChange={handleClick}
            checked={isChecked}
            className={className}
            onClick={onClick}
        />
    )
}
