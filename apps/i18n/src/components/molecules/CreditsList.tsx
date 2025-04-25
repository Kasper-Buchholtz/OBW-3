import { CreditItem } from "../atoms/CreditItem";


type Credits = {
    name: string,
    role: string

}[];

export const CreditsList = ({ credits, showCredits }: { credits: Credits, showCredits: boolean }) => {
    return (
        <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full p-4 text-white bg-black bg-opacity-75">
            <ul className="mt-4 space-y-10">
                {credits.map((credit: { name: string, role: string }) => (
                    <CreditItem key={credit.name} name={credit.name} role={credit.role} />
                ))}
            </ul>
        </div>
    );
};
