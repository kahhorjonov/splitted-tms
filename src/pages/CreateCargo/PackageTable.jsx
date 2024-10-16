import { Box, FormControlLabel, Menu, MenuItem, Switch } from '@mui/material'
import { useState } from 'react'
import Table from '../../components/Table'
import { rows } from '../../constants/mockDataShipment'
import { columns } from '../../constants/packageColumns'

const PackageTable = () => {
	const [selectedIds, setSelectedIds] = useState([])
	const [data, setData] = useState(rows)
	const [tableColumns, setTableColumns] = useState(columns)
	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleMenuItemClick = id => {
		setTableColumns(
			tableColumns.map(col =>
				col?.id === id ? { ...col, visible: !col?.visible } : col
			)
		)
	}

	const handleClick = id => {
		setTableColumns(
			tableColumns.map(col =>
				col?.id === id ? { ...col, visible: !col?.visible } : col
			)
		)
	}

	const handleSelectRow = selectedRows => {
		setSelectedIds(selectedRows)
	}

	return (
		<div>
			<Box>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					keepMounted
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					PaperProps={{
						style: {
							maxHeight: 400,
							maxWidth: 300,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						},
					}}
					disableAutoFocusItem
				>
					{tableColumns.map(({ id, headerName, visible }) => (
						<Box key={id}>
							<MenuItem
								onClick={() => handleMenuItemClick('Option 1')}
								sx={{ padding: 0 }}
							>
								<FormControlLabel
									control={
										<Switch
											onChange={() => handleClick(id)}
											checked={visible}
											sx={{
												color: '#004599',
											}}
										/>
									}
									sx={{
										margin: 0,
										width: '100%',
										padding: '8px 24px 8px 8px',
										gap: '12px',
									}}
									label={headerName}
								/>
							</MenuItem>
						</Box>
					))}
				</Menu>
			</Box>

			<Box>
				<Table
					rows={data}
					columns={tableColumns}
					onRowSelect={handleSelectRow}
				/>
			</Box>
		</div>
	)
}

export default PackageTable
