import React from 'react';

import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import pathString from '../../get_php_link.js'
import { data_pie, data_bar, status_order, statuses, data_line, data_type } from './Constants';

import { faCalendarAlt, faFilePdf, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaginationTableComponent from '../../components/GraphsTable/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Graphs.css';

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const apiUrl = pathString + '/team3/graphs.php';

export default class Graphs extends React.Component {
  constructor(props) {
    super(props);

    var current_date = new Date();

    this.handleClick = this.handleClick.bind(this);
    this.getTable = this.getTable.bind(this);
    this.updatePieChart = this.updatePieChart.bind(this);
    this.refTable = React.createRef()
    this.state = {
      startDate: new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 1),
      endDate: new Date(),
      error: null,
      btns: [null, true],
      btn_active: 1,
      incidents: [],
      incident_type: null,
      incidents_title: 'nerezolvate',
      per: null,
      current_legend: 'ziua'
    }
  }

  handleClick(event) {
    const id = event.target.id;

    var btns = [null, false, false, false];
    btns[id] = true;
    this.setState(state => ({
      btns: btns,
      btn_active: id,
      current_legend: data_type[id]
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.btn_active !== this.state.btn_active || (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate)) {
      var form_data = new FormData();
      form_data.append('type', 1);
      form_data.append('periodicity', this.state.btn_active);

      form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
      form_data.append('end', this.state.endDate.toJSON().slice(0, 10));

      const requestOptions = {
        method: 'POST',
        body: form_data
      };
      fetch(apiUrl, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
            this.pie_chart.chartInstance.update();

            //Bar
            console.log(result.status_list);
            var x = result.status_list.map(x => (x.X)).filter((v, i, a) => a.indexOf(v) === i);//doar datele distincte
            data_bar.labels = x;
            Object.values(result.status_list).forEach(val => {
              data_bar.datasets[status_order[val.STATUS]].data[x.indexOf(val.X)] = val.COUNT;
            });
            this.bar_chart.chartInstance.update();

            data_line.datasets[0].data = result.quality.map(a => a.Resolved).map(Number);
            data_line.datasets[1].data = result.quality.map(a => a.Unsolved).map(Number);
            //  if (this.state.btn_active == 2)
            //data_line.labels = result.quality.map(a => days[a.X - 1]);
            // else 
            data_line.labels = result.quality.map(a => a.X);

            this.line_chart.chartInstance.update();
          },
          (error) => {
            this.setState({ error });
          }
        )
      this.setState({ per: null, incident_type: null, incidents_title: 'nerezolvate' });
    }
  }

  handleChange(date, name) {
    this.setState({
      [name]: date
    });
  }

  componentDidMount() {
    document.title = document.title + ' - Grafice';
    //incidents
    var form_data = new FormData();
    form_data.append('type', 1);
    form_data.append('periodicity', 1);

    form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
    form_data.append('end', this.state.endDate.toJSON().slice(0, 10));

    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
          this.pie_chart.chartInstance.update();

          //Bar
          var x = result.status_list.map(x => (x.X)).filter((v, i, a) => a.indexOf(v) === i);//doar datele distincte
          data_bar.labels = x;
          Object.values(result.status_list).forEach(val => {
            data_bar.datasets[status_order[val.STATUS]].data[x.indexOf(val.X)] = val.COUNT;
          });
          this.bar_chart.chartInstance.update();

          data_line.datasets[0].data = result.quality.map(a => a.Resolved).map(Number);
          data_line.datasets[1].data = result.quality.map(a => a.Unsolved).map(Number);
          data_line.labels = result.quality.map(a => a.X);
          this.line_chart.chartInstance.update();
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  updatePieChart(id, date, set) {
    this.setState({ incident_type: statuses.indexOf(set), incidents_title: set.toString().toLowerCase() + " (" + data_type[this.state.btn_active] + " " + date + ")", per: date });

    var form_data = new FormData();
    form_data.append('type', 3);
    form_data.append('periodicity', this.state.btn_active);

    form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
    form_data.append('end', this.state.endDate.toJSON().slice(0, 10));

    form_data.append('status', id);
    form_data.append('per', date);

    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
          this.pie_chart.chartInstance.update();
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  getTable(id) {
    var form_data = new FormData();
    form_data.append('type', 2);

    form_data.append('priority', id);
    if (this.state.incident_type !== null)
      form_data.append('incident_type', this.state.incident_type);
    if (this.state.per) {
      form_data.append('periodicity', this.state.btn_active);
      form_data.append('per', this.state.per);
    }
    form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
    form_data.append('end', this.state.endDate.toJSON().slice(0, 10));
    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            incidents: result.data
          });
          document.getElementsByClassName("data-table")[0].style.display = 'block';

          setTimeout(function () {
            this.refTable.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }.bind(this), 300);
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Raport incidente (" + this.state.startDate.toJSON().slice(0, 10) + " - " + this.state.endDate.toJSON().slice(0, 10) + ")";
    const headers = [["#ID", "Status", "Submit date", "Cat Tier"]];

    const data = this.state.incidents.map(incident => (
      [incident.INCIDENT_NUMBER, incident.STATUS, incident.SUBMIT_DATE, incident.CAT_TIER_1]
    ));
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("incidents.pdf")
  }

  exportCSV = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws = XLSX.utils.json_to_sheet(this.state.incidents);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "incidents.xlsx");
  }

  render() {
    const { startDate, endDate, incidents } = this.state;
    const { getTable, updatePieChart } = this

    return (
      <div className="graphs-page">
        <div className="sub-page">
          <div className="box-mod-actions">
            <h3>Perioadă</h3>
            <div className="actions-container">
              <div>
                <DatePicker dateFormat="dd.MM.yyyy" selected={startDate} onChange={(date) => this.handleChange(date, 'startDate')} />
                <div className="calendar-icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
              </div>
              <div>
                <DatePicker dateFormat="dd.MM.yyyy" selected={endDate} onChange={(date) => this.handleChange(date, 'endDate')} />
                <div className="calendar-icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
              </div>
              <div>
                <button id="1" className={`btn-small btn-small-${this.state.btns[1] ? 'on' : 'off'}`} onClick={this.handleClick}>
                  Daily
            </button>
                <button id="2" className={`btn-small btn-small-${this.state.btns[2] ? 'on' : 'off'}`} onClick={this.handleClick}>
                  Weekly
            </button>
                <button id="3" className={`btn-small btn-small-${this.state.btns[3] ? 'on' : 'off'}`} onClick={this.handleClick}>
                  Monthly
            </button>
              </div>
            </div>

          </div>
          <br></br>
          <div className="grid-container">
            <div className="box-mod">
              <h3>Statistica incidentelor</h3>
              <div className="graphContainer">
                <Bar ref={(reference) => this.bar_chart = reference} redraw={true} data={data_bar} width={400} height={400}
                  options={{
                    maintainAspectRatio: false,
                    legend: { display: false },
                    plugins: { labels: { render: 'value' } },
                    onClick: function (evt, element) {
                      var bar_element = this.bar_chart.chartInstance.getElementAtEvent(evt);

                      if (element.length > 0 && bar_element.length > 0) {
                        var element_id = bar_element[0]._datasetIndex;

                        updatePieChart(element_id, element[element_id]['_model'].label, element[element_id]['_model'].datasetLabel);
                      }
                    }.bind(this)
                  }}
                />
              </div>
              <span className="small-legend">{this.state.current_legend}</span>
            </div>
            <div className="box-mod">
              <h3>Incidente {this.state.incidents_title}</h3>
              <div className="graphContainer">
                <Pie ref={(reference) => this.pie_chart = reference} redraw={true} data={data_pie} width={400} height={400} options={{ maintainAspectRatio: false, title: { display: true, text: 'Prioritate:' }, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; getTable(ind); } }, plugins: { labels: { render: 'value', fontColor: '#ffffff', fontSize: 12 } } }} />
              </div>
            </div>
          </div>
          <br></br>
          <div className="box-mod big-graph">
            <h3>Statistica soluționării incidentelor</h3>
            <div className="graphContainer" className="size-graph3">
              <Line ref={(reference) => this.line_chart = reference} redraw={true} data={data_line} options={{ maintainAspectRatio: false, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; console.log(data_line.labels[ind]); } } }} width={400} height={400} />
            </div>
            <span className="small-legend">{this.state.current_legend}</span>
          </div>
          <br></br>
          <div ref={this.refTable} className="box-mod data-table" style={{ "display": "none" }}>
            <h3>Listă incidente</h3>
            <div className="big-table">
              <div className="table-export">
                <div class="dropdown">
                  <button class="dropbtn">Exportă tabelul</button>
                  <div class="dropdown-content">
                    <a onClick={() => this.exportPDF()}><FontAwesomeIcon icon={faFilePdf} />  PDF</a>
                    <a onClick={() => this.exportCSV()}><FontAwesomeIcon icon={faFileCsv} />  Excel</a>
                  </div>
                </div>
              </div>
              <PaginationTableComponent table_data={incidents} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
