import "./sideContent.css";

export const SideContent = ({ content }) => {
    return (
        <div>
            {content === 'averagetimes' ? (
                <div>Display average times content here</div>
            ) : (
                <div>Display time table content here</div>
            )}
        </div>
    );
}