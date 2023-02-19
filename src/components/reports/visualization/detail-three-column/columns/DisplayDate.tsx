import React, { FC, ReactElement,} from "react";
import { Button, Form, Card, Col, ListGroup } from "react-bootstrap";
import "../../../../../App.scss"; 
import moment from "moment";
   
export interface ReportColumnDisplayDateProps {
  forColumn:string 
  value: Date 
  label:string
}
   
export const ReportColumnDisplayDate: FC<ReportColumnDisplayDateProps> = ({
  forColumn, 
  value, 
  label,
}): ReactElement => { 

  const groupName = forColumn +'-column';
      
  const formatDate = () => { 
    let result:string = "";
    
    try {
        
      if(value == null)
      {
          return result;
      }

      const dateTime:moment.Moment = moment.utc(value.toISOString()).local();

      if(!dateTime.isValid()){
        return result;
      }
      
      if(dateTime.format("MM-DD-YYYY") == "12-31-1752"){
        return result;
      }

      result = moment.utc(value).local().format("M/D/YYYY");
    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayDate');
    }
    
    return result;
  }

  return ( 
    <Col data-testid={groupName} lg="5" md="5" xs="12">
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{label}</div>
                {formatDate()}
            </div>

        </ListGroup.Item>
    </Col>
  );
};
   