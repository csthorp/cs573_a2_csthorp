import altair as alt
import pandas as pd

df = pd.read_csv("penglings.csv") # Load the penglings dataset from the CSV file
df.dropna(inplace=True)  # Drop rows with missing values
df = df[df['bill_length_mm'] != 0] # Remove rows where bill_length_mm is zero, as it may indicate missing data

chart = alt.Chart(df).mark_circle(size=80,opacity=0.7).encode(
    
    x=alt.X('flipper_length_mm',title='Flipper Length (mm)',
            scale=alt.Scale(domain=[170, 240]),
            axis=alt.Axis(tickCount=7)), # set x-axis range and tick count
    
    y=alt.Y('body_mass_g',title='Body Mass (g)',
            scale=alt.Scale(zero=False),
            axis=alt.Axis(tickCount=6)), # set y-axis to not start at zero and set tick count
    
    color=alt.Color('species',title='Species',
                    scale=alt.Scale(scheme='tableau20')), # set color scheme for species
    
    size=alt.Size('bill_length_mm',title='Bill Length (mm)', # set size encoding for bill length with appropriate title and scale
                  scale=alt.Scale(domain=[df['bill_length_mm'].min(), 
                                          df['bill_length_mm'].max()])),
    
    tooltip=['species', 'flipper_length_mm', 'body_mass_g'] # add tooltip for interactivity

).properties( # add title and subtitle, and set width and height
    title={'text': 'Wicked Cute Nonflying Birds', 
           'subtitle': 'Flipper Length vs Body Mass by Bill Length & Species of Penguins'},
    width=800,
    height=500

).interactive()

chart.save("penglings.html")
