import React, { Fragment } from "react";
// BS
import { Dropdown, Nav, Tab } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
// images

import ActiveUser from "./Ventic/WidgetBasic/ActiveUser";

import FeeCollection from "./Ventic/WidgetBasic/FeeCollection";

import NewStudent from "./Ventic/WidgetBasic/NewStudent";

import TotalCourse from "./Ventic/WidgetBasic/TotalCourse";
import TotalStudent from "./Ventic/WidgetBasic/TotalStudent";

import VisitorActivity from "./Ventic/WidgetBasic/VisitorActivity";
;
// Page titie


const Widget = () => {
  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">
      <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header  border-0 pb-0">
              <h4 className="card-title">Recent Activities</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo1"
                className="widget-media dz-scroll ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Bometric Enrollment</h5>
                        <small className="d-block">
                          29 July 2022 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-info">RA</div>
                      <div className="media-body">
                        <h5 className="mb-1">Phamarcy Refill</h5>
                        <small className="d-block">
                          29 July 2022 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="i-false p-0 btn-info sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-success">
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Lab Test Order</h5>
                        <small className="d-block">
                          29 July 2022 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className=" i-false p-0 btn-success sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-danger">RA</div>
                      <div className="media-body">
                        <h5 className="mb-1">Clinic Visit</h5>
                        <small className="d-block">
                          20 July 2021 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          type="button"
                          className="btn btn-danger light sharp   i-false p-0 sharp "
                          data-toggle="dropdown"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-primary">
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Clinic Visit</h5>
                        <small className="d-block">
                          19 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Viral Load Detail</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge info"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge danger"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge success"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge warning"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge dark"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Refill Summary</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine1"
                className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                     <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge info"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge danger"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge success"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge warning"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge dark"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
       
        {/* <div className="col-xl-4 col-xxl-6 col-lg-6">
          <div className="card border-0 pb-0">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Notifications 2</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo2"
                className="widget-media dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Dr sultads Send you Photo</h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-info">KG</div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Resport created successfully{" "}
                          <span className="badge badge-warning">Warning</span>
                        </h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className=" btn-info i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-success">
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Reminder : Treatment Time!</h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className=" btn-success i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Dr sultads Send you Photo{" "}
                          <span className="badge light badge-danger">
                            Danger
                          </span>
                        </h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-danger">KG</div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Resport created successfully{" "}
                          <span className="badge light badge-success">
                            Success
                          </span>
                        </h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-danger i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-primary">
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Reminder : Treatment Time!{" "}
                          <span className="badge light badge-success">
                            Success
                          </span>
                        </h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-6 col-lg-6">
          <div className="card border-0 pb-0">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Message</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo3"
                className="widget-media dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Alfie Mason{" "}
                          <small className="text-muted">29 July 2020</small>
                        </h5>
                        <p className="mb-1">
                          I shared this on my fb wall a few months back..
                        </p>
                        <Link
                          to="/widget-basic"
                          className="btn btn-primary btn-xxs shadow"
                        >
                          Reply
                        </Link>
                        <Link
                          to="/widget-basic"
                          className="btn btn-outline-danger btn-xxs ms-1"
                        >
                          Delete
                        </Link>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-info">KG</div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Jacob Tucker{" "}
                          <small className="text-muted">29 July 2020</small>
                        </h5>
                        <p className="mb-1">
                          I shared this on my fb wall a few months back..
                        </p>
                        <Link
                          to="/widget-basic"
                          className="btn btn-primary btn-xxs shadow"
                        >
                          Reply
                        </Link>
                        <Link
                          to="/widget-basic"
                          className="btn btn-outline-danger btn-xxs ms-1"
                        >
                          Delete
                        </Link>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-info i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-success">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Jack Ronan{" "}
                          <small className="text-muted">29 July 2020</small>
                        </h5>
                        <p className="mb-1">
                          I shared this on my fb wall a few months back..
                        </p>
                        <Link
                          to="/widget-basic"
                          className="btn btn-primary btn-xxs shadow"
                        >
                          Reply
                        </Link>
                        <Link
                          to="/widget-basic"
                          className="btn btn-outline-danger btn-xxs ms-1"
                        >
                          Delete
                        </Link>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-success i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Noah Baldon{" "}
                          <small className="text-muted">29 July 2020</small>
                        </h5>
                        <p className="mb-1">
                          I shared this on my fb wall a few months back..
                        </p>
                        <Link
                          to="/widget-basic"
                          className="btn btn-primary btn-xxs shadow"
                        >
                          Reply
                        </Link>
                        <Link
                          to="/widget-basic"
                          className="btn btn-outline-danger btn-xxs ms-1"
                        >
                          Delete
                        </Link>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-danger">PU</div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Thomas Grady{" "}
                          <small className="text-muted">02:26 PM</small>
                        </h5>
                        <p className="mb-1">
                          I shared this on my fb wall a few months back..
                        </p>
                        <Link
                          to="/widget-basic"
                          className="btn btn-primary btn-xxs shadow"
                        >
                          Reply
                        </Link>
                        <Link
                          to="/widget-basic"
                          className="btn btn-outline-danger btn-xxs ms-1"
                        >
                          Delete
                        </Link>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-danger i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-primary">
                        <img  alt="" width="50" />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">
                          Oscar Weston{" "}
                          <small className="text-muted">29 July 2020</small>
                        </h5>
                        <p className="mb-1">
                          I shared this on my fb wall a few months back..
                        </p>
                        <Link
                          to="/widget-basic"
                          className="btn btn-primary btn-xxs shadow"
                        >
                          Reply
                        </Link>
                        <Link
                          to="/widget-basic"
                          className="btn btn-outline-danger btn-xxs ms-1"
                        >
                          Delete
                        </Link>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-6 col-lg-6">
          <div className="card border-0 pb-0">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">To Do List</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo4"
                className="widget-media dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-panel">
                      <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox1"
                          required=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox1"
                        ></label>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-0">Get up</h5>
                        <small className="text-muted">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="form-check custom-checkbox checkbox-warning check-lg me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox2"
                        ></label>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-0">Stand up</h5>
                        <small className="text-muted">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="form-check custom-checkbox checkbox-primary check-lg me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox3"
                          required=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox3"
                        ></label>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-0">Don't give up the fight.</h5>
                        <small className="text-muted">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-info i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="form-check custom-checkbox checkbox-info check-lg me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox4"
                          required=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox4"
                        ></label>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-0">Do something else</h5>
                        <small className="text-muted">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-danger i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox5"
                          required=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox5"
                        ></label>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-0">Get up</h5>
                        <small className="text-muted">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="btn-success i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="form-check custom-checkbox checkbox-warning check-lg me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox6"
                          required=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox6"
                        ></label>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-0">Stand up</h5>
                        <small className="text-muted">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-primary text-primary">
                  <svg
                    id="icon-customers"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Patient</p>
                  <h4 className="mb-0">3280</h4>
                  <span className="badge badge-primary">+3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-warning text-warning">
                  <svg
                    id="icon-orders"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-file-text"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Bills</p>
                  <h4 className="mb-0">2570</h4>
                  <span className="badge badge-warning">+3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body  p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-danger text-danger">
                  <svg
                    id="icon-revenue"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-dollar-sign"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Revenue</p>
                  <h4 className="mb-0">364.50K</h4>
                  <span className="badge badge-danger">-3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-success text-success">
                  <svg
                    id="icon-database-widget"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-database"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Patient</p>
                  <h4 className="mb-0">364.50K</h4>
                  <span className="badge badge-success">-3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-danger">
            <div className="card-body  p-4">
              <div className="media">
                <span className="me-3">
                  <i className="flaticon-381-calendar-1"></i>
                </span>
                <div className="media-body text-white text-end">
                  <p className="mb-1">Appointment</p>
                  <h3 className="text-white">76</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-success">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="flaticon-381-diamond"></i>
                </span>
                <div className="media-body text-white text-end">
                  <p className="mb-1">Earning</p>
                  <h3 className="text-white">$56K</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-info">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="flaticon-381-heart"></i>
                </span>
                <div className="media-body text-white text-end">
                  <p className="mb-1">Total Patient</p>
                  <h3 className="text-white">783K</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-primary">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="flaticon-381-user-7"></i>
                </span>
                <div className="media-body text-white text-end">
                  <p className="mb-1">Chef</p>
                  <h3 className="text-white">$76</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-primary">
            <div className="card-body  p-4">
              <div className="media">
                <span className="me-3">
                  <i className="la la-users"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Total Students</p>
                  <h3 className="text-white">3280</h3>
                  <div className="progress mb-2 bg-secondary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <small>80% Increase in 20 Days</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-warning">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="la la-user"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">New Students</p>
                  <h3 className="text-white">245</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <small>50% Increase in 25 Days</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-secondary">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="la la-graduation-cap"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Total Course</p>
                  <h3 className="text-white">28</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                  <small>76% Increase in 20 Days</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-danger ">
            <div className="card-body p-4">
              <div className="media">
                <span className="me-3">
                  <i className="la la-dollar"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Fees Collect</p>
                  <h3 className="text-white">250$</h3>
                  <div className="progress mb-2 bg-secondary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                  <small>30% Increase in 30 Days</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <h4 className="card-title">Total Students</h4>
              <h3>3280</h3>
              <div className="progress mb-2">
                <div
                  className="progress-bar progress-animated bg-primary"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <small>80% Increase in 20 Days</small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <h4 className="card-title">New Students</h4>
              <h3>245</h3>
              <div className="progress mb-2">
                <div
                  className="progress-bar progress-animated bg-warning"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <small>50% Increase in 25 Days</small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <h4 className="card-title">Total Course</h4>
              <h3>28</h3>
              <div className="progress mb-2">
                <div
                  className="progress-bar progress-animated bg-red"
                  style={{ width: "76%" }}
                ></div>
              </div>
              <small>76% Increase in 20 Days</small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <h4 className="card-title">Fees Collection</h4>
              <h3>25160$</h3>
              <div className="progress mb-2">
                <div
                  className="progress-bar progress-animated bg-success"
                  style={{ width: "30%" }}
                ></div>
              </div>

              <small>30% Increase in 30 Days</small>
            </div>
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-sm-12">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-primary">
                <div className="card-header border-0 pb-0">
                  <h3 className="card-title text-white">Total Students</h3>
                  <h5 className="text-white mb-0">
                    <i className="fa fa-caret-up"></i> 422
                  </h5>
                </div>
                <div className="card-body text-center">
                  <div className="ico-sparkline">
                    <TotalStudent />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-warning overflow-hidden">
                <div className="card-header border-0 ">
                  <h3 className="card-title text-white">New Students</h3>
                  <h5 className="text-white mb-0">
                    <i className="fa fa-caret-up"></i> 357
                  </h5>
                </div>
                <div className="card-body text-center p-0">
                  <div className="ico-sparkline">
                    <NewStudent />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-secondary">
                <div className="card-header pb-3 border-0 pb-0">
                  <h3 className="card-title text-white">Total Course</h3>
                  <h5 className="text-white mb-0">
                    <i className="fa fa-caret-up"></i> 547
                  </h5>
                </div>
                <div className="card-body p-0">
                  <div className="px-4">
                    <TotalCourse />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-danger overflow-hidden">
                <div className="card-header pb-3 border-0 pb-0">
                  <h3 className="card-title text-white">Fees Collection</h3>
                  <h5 className="text-white mb-0">
                    <i className="fa fa-caret-up"></i> 3280$
                  </h5>
                </div>
                <div className="card-body p-0">
                  <FeeCollection />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-sm-12">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h2 className="card-title">about me</h2>
            </div>
            <div className="card-body pb-0">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong>Gender</strong>
                  <span className="mb-0">Male</span>
                </li>
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong>Education</strong>
                  <span className="mb-0">PHD</span>
                </li>
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong>Designation</strong>
                  <span className="mb-0">Se. Professor</span>
                </li>
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong>Operation Done</strong>
                  <span className="mb-0">120</span>
                </li>
              </ul>
            </div>
            <div className="card-footer pt-0 pb-0 text-center">
              <div className="row">
                <div className="col-4 pt-3 pb-3 border-right">
                  <h3 className="mb-1 text-primary">150</h3>
                  <span>Projects</span>
                </div>
                <div className="col-4 pt-3 pb-3 border-right">
                  <h3 className="mb-1 text-primary">140</h3>
                  <span>Uploads</span>
                </div>
                <div className="col-4 pt-3 pb-3">
                  <h3 className="mb-1 text-primary">45</h3>
                  <span>Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-8 col-xxl-8 col-lg-12 col-sm-12">
          <div id="user-activity" className="card">
            <Tab.Container defaultActiveKey="day">
              <div className="card-header border-0 pb-0 d-sm-flex d-block">
                <h4 className="card-title">Visitor Activity</h4>
                <div className="card-action mb-sm-0 my-2">
                  <Nav className="nav nav-tabs" role="tablist">
                    <Nav.Item className="nav-item">
                      <Nav.Link
                        className="nav-link "
                        data-toggle="tab"
                        to="/widget-basic"
                        role="tab"
                        eventKey="day"
                      >
                        Day
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                      <Nav.Link
                        className="nav-link"
                        data-toggle="tab"
                        to="/widget-basic"
                        role="tab"
                        eventKey="month"
                      >
                        Month
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                      <Nav.Link
                        className="nav-link"
                        data-toggle="tab"
                        to="/widget-basic"
                        role="tab"
                        eventKey="year"
                      >
                        Year
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
              <div className="card-body">
                <Tab.Content className="tab-content" id="myTabContent">
                  <Tab.Pane eventKey="day" id="user" role="tabpanel">
                    <VisitorActivity dataActive={0} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="month" id="user" role="tabpanel">
                    <VisitorActivity dataActive={1} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="year" id="user" role="tabpanel">
                    <VisitorActivity dataActive={2} />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-sm-6">
          <div className="card overflow-hidden">
            <div className="card-body">
              <div className="text-center">
                <div className="profile-photo">
                  <img
                   
                    width="100"
                    className="img-fluid rounded-circle"
                    alt=""
                  />
                </div>
                <h3 className="mt-4 mb-1">Deangelo Sena</h3>
                <p className="text-muted">Senior Manager</p>
                <Link
                  className="btn btn-outline-primary btn-rounded mt-3 px-5"
                  to="/widget-basic"
                >
                  Folllow
                </Link>
              </div>
            </div>

            <div className="card-footer pt-0 pb-0 text-center">
              <div className="row">
                <div className="col-4 pt-3 pb-3 border-right">
                  <h3 className="mb-1">150</h3>
                  <span>Follower</span>
                </div>
                <div className="col-4 pt-3 pb-3 border-right">
                  <h3 className="mb-1">140</h3>
                  <span>Place Stay</span>
                </div>
                <div className="col-4 pt-3 pb-3">
                  <h3 className="mb-1">45</h3>
                  <span>Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-sm-6">
          <div className="card active_users">
            <div className="card-header bg-secondary border-0 d-block pb-0">
              <h4 className="card-title text-white">Active Users</h4>
              <ActiveUser />
            </div>
            <div className="card-body pt-0">
              <div className="list-group-flush mt-4">
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0">
                  <p className="mb-0">Top Active Pages</p>
                  <p className="mb-0">Active Users</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0">/bootstrap-themes/</p>
                  <p className="mb-0">3</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0">/tags/html5/</p>
                  <p className="mb-0">3</p>
                </div>
                <div className="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none">
                  <p className="mb-0">/</p>
                  <p className="mb-0">2</p>
                </div>
                <div className="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none">
                  <p className="mb-0">/preview/falcon/dashboard/</p>
                  <p className="mb-0">2</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0">/100-best-themes...all-time/</p>
                  <p className="mb-0">1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-12 col-sm-12">
          <div className="card overflow-hidden">
            <div
              className="text-center p-3 overlay-box "
              style={{ backgroundImage: `` }}
            >
              <div className="profile-photo">
                <img
                  
                  
                  width="100"
                  className="m-auto img-fluid rounded-circle d-block"
                  alt=""
                />
              </div>
              <h3 className="mt-3 mb-1 text-white">Deangelo Sena</h3>
              <p className="text-white mb-0">Senior Manager</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span className="mb-0">Patient Gender</span>{" "}
                <strong className="text-muted">Female </strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="mb-0">Years Old</span>{" "}
                <strong className="text-muted">Age: 24 </strong>
              </li>
			  <li className="list-group-item d-flex justify-content-between">
                <span className="mb-0">Patient Height</span>{" "}
                <strong className="text-muted">1.5 M </strong>
              </li>
            </ul>
            <div className="card-footer border-0 mt-0">
              <button className="btn btn-primary btn-lg btn-block">
                <i className="fa fa-bell-o"></i> Reminder Alarm
              </button>
            </div>
          </div>
       

 */}
 </div>
      
    </Fragment>
  );
};

export default Widget;
