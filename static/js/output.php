	
	
	<?php 
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$values = '[["Year", "Agency Cost(Conv mat)", "User Cost(Conv mat)", "Agency Cost(New mat)", "User Cost(New mat)",{ "role": "annotation" } ],';
		$pieValues = '[["Cost", "Total Amount"],';
		$pieValues2 = '[["Cost", "Total Amount"],';
		$length = 231.9 /5280;
		$width = 154.8/ 5280;
		$numberOfLanes = 12;
		$ADT = 114750;

		$trafficSpeedDuringMaintenance = 20;
		$normalTrafficSpeed = 60;
		$hourlyTimeValue = 20;
		$weightedAverageVehicleCost = 8;

		$years = $_POST["activityYears"];
		$new_years = $_POST["activityNewYears"];
		//$discountedVal = pow((1+($_POST["disc_rate"]/100)),15);
		$days = $_POST["activityDays"];
		$new_days = $_POST["activityNewDays"];
		$analysis = $_POST["analysis"];

		$agencyCostConv = array();
		$userCostConv = array();
		$unitcostConv = 91.05;
		$unitcostNew = 106.50;
		$totalcrashRiskCostConv = 0;
		$totalTrafficDelayCostConv = 0;
		$totalVehicleOperationCostConv = 0;
		$price_factor = $unitcostNew / $unitcostConv;
		$initialConCostConv = $_POST["ccon_val"] * $length *5280 * $width*5280;
		$agencyCostConv[] = $initialConCostConv; 

		for ($x = $years[0]; $x <= $analysis; $x=$x+$years[0]) {
			#echo "The number is: $x <br>";
			$discountedVal = pow((1+($_POST["disc_rate"]/100)),$x);
			$maintenanceCostConv = (0.05 * $initialConCostConv) / $discountedVal ;
			if($x == $years[1]) {
				$vehicleOperationCostConv = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $days[1] * $weightedAverageVehicleCost) / $discountedVal;
				$trafficDelayCostConv = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $days[1] * $hourlyTimeValue) / $discountedVal;
				$crashRiskCostConv = (0.13 * $length * $ADT * $days[1]) / $discountedVal;
				$resurfacingCostConv = (exp(-0.716 + (0.8197 * log($numberOfLanes * $length))) * 1000000) / ($discountedVal);
				$totalResurfacingCostConv = $totalResurfacingCostConv + $resurfacingCostConv;	
			} elseif ($x == $years[2]) {
				$vehicleOperationCostConv = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $days[2] * $weightedAverageVehicleCost) / $discountedVal;
				$trafficDelayCostConv = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $days[2] * $hourlyTimeValue) / $discountedVal;
				$crashRiskCostConv = (0.13 * $length * $ADT * $days[2]) / $discountedVal;
				$replacementCostConv = $initialConCostConv / $discountedVal;
				$totalReplacementCostConv = $totalReplacementCostConv + $replacementCostConv;
			} else {
				$vehicleOperationCostConv = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $days[0] * $weightedAverageVehicleCost) / $discountedVal;
				$crashRiskCostConv = (0.13 * $length * $ADT * $days[0]) / $discountedVal;
				$trafficDelayCostConv = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $days[0] * $hourlyTimeValue) / $discountedVal;
			}
			
			$agencyCostConv[] = $resurfacingCostConv + $replacementCostConv + $maintenanceCostConv;
			$userCostConv[] = $trafficDelayCostConv + $vehicleOperationCostConv + $crashRiskCostConv;
			
			$sewageCostConv = (0.02 * $initialConCostConv) / $discountedVal;
			$totalTrafficDelayCostConv = $totalTrafficDelayCostConv + $trafficDelayCostConv;
			$totalcrashRiskCostConv = $totalcrashRiskCostConv + $crashRiskCostConv;
			$totalVehicleOperationCostConv = $totalVehicleOperationCostConv + $vehicleOperationCostConv;
			$totalMaintenanceCostConv = $totalMaintenanceCostConv + $maintenanceCostConv;
			$totalSewageCostConv = $totalSewageCostConv + $sewageCostConv;
			$resurfacingCostConv = 0;
			$replacementCostConv = 0;
			$maintenanceCostConv = 0;
			$trafficDelayCostConv = 0;
			$vehicleOperationCostConv = 0;
			$crashRiskCostConv = 0;
		}
	$totalAgencyCostConv = $totalResurfacingCostConv + $totalReplacementCostConv + $totalMaintenanceCostConv + $initialConCostConv;		
	$totalUserCostConv = $totalTrafficDelayCostConv + $totalVehicleOperationCostConv + $totalcrashRiskCostConv;

	$lifeCycleCostConv = $totalAgencyCostConv + $totalUserCostConv;
	
	$agencyCostNew = array();
	$userCostNew = array();
	$initialConCostNew = $_POST["ncon_val"] * $length *5280 * $width*5280;
	$agencyCostNew[] = $initialConCostNew;
	
	for ($x = $new_years[0]; $x <= $analysis; $x=$x+$new_years[0]) {
		#echo "The number is: $x <br>";
		$discountedVal = pow((1+($_POST["disc_rate"]/100)),$x);
		$maintenanceCostNew = (0.05 * $initialConCostNew) / $discountedVal ;
		if($x == $new_years[1]) {
			$vehicleOperationCostNew = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $new_days[1] * $weightedAverageVehicleCost) / $discountedVal;
			$trafficDelayCostNew = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $new_days[1] * $hourlyTimeValue) / $discountedVal;
			$crashRiskCostNew = (0.13 * $length * $ADT * $new_days[1]) / $discountedVal;
			$resurfacingCostNew = ((exp(-0.716 + (0.8197 * log($numberOfLanes * $length))) * 1000000) / ($discountedVal)) * $price_factor;
			$totalResurfacingCostNew = $totalResurfacingCostNew + $resurfacingCostNew;	
		} elseif ($x == $new_years[2]) {
			$vehicleOperationCostNew = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $new_days[2] * $weightedAverageVehicleCost) / $discountedVal;
			$trafficDelayCostNew = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $new_days[2] * $hourlyTimeValue) / $discountedVal;
			$crashRiskCostNew = (0.13 * $length * $ADT * $new_days[2]) / $discountedVal;
			if($analysis <= $new_years[2]) {
				$replacementCostNew = 0;
			}
			else {
				$replacementCostNew = $initialConCostNew / $discountedVal;
			}
			$totalReplacementCostNew = $totalReplacementCostNew + $replacementCostNew;
		} else {
			$vehicleOperationCostNew = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $new_days[0] * $weightedAverageVehicleCost) / $discountedVal;
			$crashRiskCostNew = (0.13 * $length * $ADT * $new_days[0]) / $discountedVal;
			$trafficDelayCostNew = ((($length / $trafficSpeedDuringMaintenance) - ($length / $normalTrafficSpeed)) * $ADT * $new_days[0] * $hourlyTimeValue) / $discountedVal;
		}

		$agencyCostNew[] = $resurfacingCostNew + $replacementCostNew + $maintenanceCostNew;
		$userCostNew[] = $trafficDelayCostNew + $vehicleOperationCostNew + $crashRiskCostNew;
		
		$sewageCostNew = (0.02 * $initialConCostNew) / $discountedVal;
		$totalTrafficDelayCostNew = $totalTrafficDelayCostNew + $trafficDelayCostNew;
		$totalcrashRiskCostNew = $totalcrashRiskCostNew + $crashRiskCostNew;
		$totalVehicleOperationCostNew = $totalVehicleOperationCostNew + $vehicleOperationCostNew;
		
		//$totalMaintenanceCostNew = $totalMaintenanceCostNew + $maintenanceCostNew;
		$totalSewageCostNew = $totalSewageCostNew + $sewageCostNew;
		$totalMaintenanceCostNew = $totalMaintenanceCostNew + $maintenanceCostNew;
		$totalSewageCostNew = $totalSewageCostNew + $sewageCostNew;
		$resurfacingCostNew = 0;
		$replacementCostNew = 0;
		$maintenanceCostNew = 0;
		$trafficDelayCostNew = 0;
		$vehicleOperationCostNew = 0;
		$crashRiskCostNew = 0;
	}
	
	$totalAgencyCostNew = $totalResurfacingCostNew + $totalReplacementCostNew + $totalMaintenanceCostNew + $initialConCostNew;		
	$totalUserCostNew = $totalTrafficDelayCostNew + $totalVehicleOperationCostNew + $totalcrashRiskCostNew;

	
	$lifeCycleCostNew = $totalAgencyCostNew + $totalUserCostNew;
	
	$i = 0;
	for ($x = 0; $x <= $analysis; $x=$x+$years[0]) {
		$valueToAdd = '["'.$x.'",'.intval($agencyCostConv[$i]).','.intval($userCostConv[$i]).','.intval($agencyCostNew[$i]).','. intval($userCostNew[$i]).', ""],';
		$values = $values . $valueToAdd;
		$i++;
	}
	
	
	$values = rtrim($values, ",") . ']';
	$pieValues = $pieValues . '["Initial Construction Cost", ' . intval($initialConCostConv) . '], ["Traffic Delay Cost", ' . intval($totalTrafficDelayCostConv) . '], ["Vehicle Operation Cost", ' . intval($totalVehicleOperationCostConv) . '], ["Crash Risk Cost", ' . intval($totalcrashRiskCostConv) . '], ["Resurfacing Cost", ' . intval($totalResurfacingCostConv) . '], ["Replacement Cost", ' . intval($totalReplacementCostConv) . '], ["Maintenance Cost", ' . intval($totalMaintenanceCostConv) . ']';
	$pieValues2 = $pieValues2 . '["Initial Construction Cost", ' . intval($initialConCostNew) . '], ["Traffic Delay Cost", ' . intval($totalTrafficDelayCostNew) . '], ["Vehicle Operation Cost", ' . intval($totalVehicleOperationCostNew) . '], ["Crash Risk Cost", ' . intval($totalcrashRiskCostNew) . '], ["Resurfacing Cost", ' . intval($totalResurfacingCostNew) . '], ["Replacement Cost", ' . intval($totalReplacementCostNew) . '], ["Maintenance Cost", ' . intval($totalMaintenanceCostNew) . ']';
	
	$pieValues = rtrim($pieValues, ",") . ']';
	$pieValues2 = rtrim($pieValues2, ",") . ']';
	
	//echo $pieValues;
	#echo '<div id="chart_div" style="position:absolute; top:0px; left:475px; width:100%; height:100%; background:#600080; border: 1px solid black; opacity: 0.8; filter: alpha(opacity=80);"></div>';
	/*echo '<script type="text/javascript">'
		, 'var data_str = JSON.stringify('.$values.');'
		, 'var data_piestr = JSON.stringify('.$pieValues.');'
		, 'var lcca_conv = JSON.stringify('. intval($lifeCycleCostConv). ');'
		, 'var lcca_new = JSON.stringify('. intval($lifeCycleCostNew). ');'
		, 'google.charts.load("current", {"packages":["corechart"]});'
		, 'google.setOnLoadCallback(function() { drawColumnChart(data_str,lcca_conv,lcca_new); });'
		, 'google.setOnLoadCallback(function() { drawPieChart(data_piestr, lcca_conv); });'
		, '<\/script>';*/
	//header('Content-Type: application/javascript');
	echo json_encode($values) . "~" . json_encode($pieValues) . "~" . json_encode($pieValues2) . "~" . json_encode(intval($lifeCycleCostConv)) . "~" . json_encode(intval($lifeCycleCostNew));
	#echo $values . "~" . $pieValues . "~" . $lifeCycleCostConv . "~" . $lifeCycleCostNew;
	}
	?>
