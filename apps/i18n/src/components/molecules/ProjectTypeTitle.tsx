import Heading from "../atoms/Heading";

export function ProjectTypeTitle({ title }) {
    return (
        <div className="col-span-full pt-20 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52 pb-8">
            <Heading tag="h1" type="h1" spacing="none" className="mb-6">
                {title}
            </Heading>
            <div className="w-40 h-px bg-lights-0" />

        </div>
    );
}