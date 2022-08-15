import React from 'react';
import MaterialTable from 'material-table';


const Breakdown = (props) => {
  

  return (
      <div>
        
        <MaterialTable
            title="Breakdown of RTRI & RITA By Facility"
            columns={[
                { title: 'State', field: 'State' },
                { title: 'LGA', field: 'LGA' },
                { title: 'Facility', field: 'Facility' },
                { title: 'Total RTRI Valid', field: 'totalvalid' },
                { title: 'RTRI Recent', field: 'RTRIRecent' },
                { title: 'RTRI Recent %', field: 'RTRIPercentage' },
                { title: 'RTRI Longterm', field: 'RTRILongterm' },
                { title: 'Re-Classified Longterm', field: 'ReClassified' },
                { title: 'RITA Longterm', field: 'RITALongterm' },
                { title: 'RITA Recent', field: 'RITARecent' },
            ]}
            data={[
                { State: 'Ogun', LGA: 'Abeokuta South', Facility: 'Sacred Heart Catholic Hospital, Abeokuta', totalvalid: 63, RTRIRecent:23, RTRIPercentage:34, RTRILongterm: 34, ReClassified: 45, RITALongterm: 32, RITARecent:21 },
                { State: 'Ogun', LGA: 'Abeokuta South', Facility: 'Sacred Heart Catholic Hospital, Abeokuta', totalvalid: 63, RTRIRecent:23, RTRIPercentage:34, RTRILongterm: 34, ReClassified: 45, RITALongterm: 32, RITARecent:21 },
                
            ]}        
            options={{
                    headerStyle: {
                    backgroundColor: "#9F9FA5",
                    color: "#000",
                },
                // searchFieldStyle: {
                //     width : '300%',
                //     margingLeft: '250px',
                // },
               
                exportButton: true,
                searchFieldAlignment: 'left',
                pageSizeOptions:[10,20,100],
                pageSize:5,
                
                exportButton: true
            }}
      />
    </div>
  );
}


export default Breakdown;