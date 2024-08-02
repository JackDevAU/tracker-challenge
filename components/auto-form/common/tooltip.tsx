function AutoFormTooltip({ fieldConfigItem }: { fieldConfigItem: any }) {
	return (
		<>
			{fieldConfigItem?.description && (
				<p className="text-sm text-muted-foreground">
					{fieldConfigItem.description}
				</p>
			)}
		</>
	);
}

export default AutoFormTooltip;
