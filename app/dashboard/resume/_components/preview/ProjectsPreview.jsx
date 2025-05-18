import React from 'react';

const ProjectsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm tracking-wide mb-1"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>

      <hr
        className="border-[1px]"
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      {resumeInfo?.projects?.map((project, index) => (
        <div className="my-4" key={index}>
          <h2 className="text-sm font-bold tracking-wide">
            {project?.title}
          </h2>

          <p className="text-xs font-medium mt-1">
            {project?.description}
          </p>

          {project?.techs && (
            <p className="text-xs mt-1">
              <span className="font-semibold">Tech Stack:</span> {project.techs}
            </p>
          )}

          {project?.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 underline mt-1 inline-block"
            >
              View Project
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectsPreview;
