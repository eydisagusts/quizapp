interface HeaderComponentProps {
    score: number;
    totalQuestions: number;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ score, totalQuestions }) => {
    return (
        <header className="flex flex-col text-center p-8">
            <h1 className="text-black text-4xl font-bold p-8">Quiz App</h1>
            <div className="text-2xl">
                Score {score} / {totalQuestions}
            </div>
        </header>
    )
}

export default HeaderComponent;