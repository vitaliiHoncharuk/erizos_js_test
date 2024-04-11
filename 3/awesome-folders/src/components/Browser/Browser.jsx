import TextField from "@mui/material/TextField";
import folderData from "../../data/folderData.json";
import { Folder } from "../Folder";
import { File } from "../File";
import List from "@mui/material/List";
import React from "react";

class Browser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: folderData,
            expandedFolders: props.expandedFolders || [],
            searchQuery: '',
        };
    }

    renderNode = (node, path = '') => {
        const fullPath = path + '/' + node.name;
        const isExpanded = this.state.expandedFolders.includes(fullPath);

        if (node.type === "FOLDER") {
            const children = node.children.map((child) => this.renderNode(child, fullPath));
            return (
                <div key={fullPath} style={{ marginLeft: '20px' }}>
                    <Folder name={node.name} isInitiallyExpanded={isExpanded}>
                        {children}
                    </Folder>
                </div>
            );
        } else if (node.type === "FILE") {
            return (
                <div key={fullPath} style={{ marginLeft: '20px' }}>
                    <File name={node.name} mimeType={node.mime} />
                </div>
            );
        }
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value.toLowerCase() });
    };

    filteredData = (node) => {
        const { searchQuery } = this.state;

        if (!node) {
            return this.state.data.map((rootNode) => this.filteredData(rootNode)).filter(Boolean);
        }

        if (node.type === "FILE") {
            return node.name.toLowerCase().includes(searchQuery) ? node : null;
        } else if (node.type === "FOLDER") {
            const children = node.children.map((child) => this.filteredData(child)).filter(Boolean);
            return children.length > 0 ? { ...node, children } : null;
        }
    };

    render() {
        const { searchQuery } = this.state;
        const filteredData = this.filteredData();

        return (
            <div>
                <TextField
                    label="Search files"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    fullWidth
                    margin="normal"
                    onChange={this.handleSearchChange}
                />
                <List>
                    {filteredData.map((node) => this.renderNode(node))}
                </List>
            </div>
        );
    }
}

export default Browser;