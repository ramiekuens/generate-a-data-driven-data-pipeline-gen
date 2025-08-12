class DataPipelineGenerator {
  constructor(pipelineName, dataSources, dataProcessors, dataSinks) {
    this.pipelineName = pipelineName;
    this.dataSources = dataSources;
    this.dataProcessors = dataProcessors;
    this.dataSinks = dataSinks;
  }

  generatePipeline() {
    const pipelineConfig = {
      name: this.pipelineName,
      stages: []
    };

    this.dataSources.forEach((dataSource) => {
      pipelineConfig.stages.push({
        type: 'source',
        config: dataSource.config
      });
    });

    this.dataProcessors.forEach((dataProcessor) => {
      pipelineConfig.stages.push({
        type: 'processor',
        config: dataProcessor.config
      });
    });

    this.dataSinks.forEach((dataSink) => {
      pipelineConfig.stages.push({
        type: 'sink',
        config: dataSink.config
      });
    });

    return pipelineConfig;
  }
}

class DataSource {
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }
}

class DataProcessor {
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }
}

class DataSink {
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }
}

// Example usage
const dataSource1 = new DataSource('API Source', {
  url: 'https://api.example.com/data',
  method: 'GET'
});

const dataSource2 = new DataSource('File Source', {
  filePath: './data.csv',
  format: 'CSV'
});

const processor1 = new DataProcessor('Data Validator', {
  rules: [
    {
      field: 'name',
      required: true
    }
  ]
});

const processor2 = new DataProcessor('Data Transformer', {
  transformations: [
    {
      field: 'date',
      format: 'YYYY-MM-DD'
    }
  ]
});

const sink1 = new DataSink('Database Sink', {
  database: 'mydatabase',
  table: 'mytable'
});

const sink2 = new DataSink('File Sink', {
  filePath: './output.csv',
  format: 'CSV'
});

const generator = new DataPipelineGenerator(
  'My Data Pipeline',
  [dataSource1, dataSource2],
  [processor1, processor2],
  [sink1, sink2]
);

const pipelineConfig = generator.generatePipeline();
console.log(pipelineConfig);