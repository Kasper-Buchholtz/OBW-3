import Heading from "./Heading";
import Paragraph from "./Paragraph";

export const CreditItem = ({ name, role }: { name: string, role: string }) => {
    return (
        <li>
            <Paragraph className="uppercase" spacing="none">{role}</Paragraph>
            <Heading fontFamily='serif' spacing="none">{name}</Heading>
        </li>
    );
}