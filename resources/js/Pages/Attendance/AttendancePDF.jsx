import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: 4 },
  bold: { fontWeight: 'bold' },
});

export default function AttendancePDF({ attendances }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Attendance Report</Text>

        <View style={styles.row}>
          <Text style={[styles.bold, { width: '25%' }]}>User</Text>
          <Text style={[styles.bold, { width: '25%' }]}>Check In</Text>
          <Text style={[styles.bold, { width: '25%' }]}>Check Out</Text>
          <Text style={[styles.bold, { width: '25%' }]}>Date</Text>
        </View>

        {attendances.map((att) => (
          <View style={styles.row} key={att.id}>
            <Text style={{ width: '25%' }}>{att.employee?.user?.name || '-'}</Text>
            <Text style={{ width: '25%' }}>{att.check_in}</Text>
            <Text style={{ width: '25%' }}>{att.check_out || '-'}</Text>
            <Text style={{ width: '25%' }}>{att.date}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
