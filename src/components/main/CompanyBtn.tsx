import { useDispatch } from "react-redux";
import { filterByCompany } from "../../store/reducers/furnitureSlice";
import { AppDispatch } from "../../store/store";

interface CompanyBtnProps {
  company: string;
}

export const CompanyBtn = ({ company }: CompanyBtnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (company: string) => {
    dispatch(filterByCompany(company));
  };
  return (
    <button className="company-btn" onClick={() => handleClick(company)}>
      {company}
    </button>
  );
};
