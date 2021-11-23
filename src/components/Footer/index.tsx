import Constants from "@/utils/constants";
import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-layout";

interface FooterProps {
    showIcp?: boolean;
}

const Footer = function(props: FooterProps) {
    const defaultMessage = `${Constants.project.company}出品`;
    const currentYear = new Date().getFullYear();
    const years = currentYear === 2021 ? currentYear : `2021-${currentYear}`;
    return (
      <DefaultFooter
        copyright={`${years} ${defaultMessage}`}
        links={props.showIcp ? [
            {
                key: 'ICP',
                title: Constants.project.icp,
                href: 'https://ant.design',
                blankTarget: true,
            },
        ] : []}
      />
    );
  };
  
  export default Footer;
  