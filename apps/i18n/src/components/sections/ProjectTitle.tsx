import { clean } from "@/utils/sanitize";
import FictionalProjectTitle from "../molecules/FictionalProjectTitle";
import MusicalProjectTitle from "../molecules/MusicalProjectTitle";
import React from "react";
/**
 *
 * @returns: En ProjectTitle-komponent ...
 * @example: <ProjectTitle />
 * @alias: ProjectTitle
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/


const ProjectTitle = ({ data }) => {
    return (
        <React.Fragment>
            {clean(data.caseType) === "musical" && <MusicalProjectTitle data={data} />}
            {clean(data.caseType) === "fictional" && <FictionalProjectTitle data={data} />}
            {clean(data.caseType) === "commercial" && <FictionalProjectTitle data={data} />}
        </React.Fragment>
    )
};

export default ProjectTitle;