Drag a button to your view controller, you should get this bit of code
@IBOutlet var cards: [UIImageView]

Change your code to this, and drag the other items
@IBOutlet var cards: Array<UIImageView>

the code above won't compile so switch it to this;

@IBOutlet strong var cards: NSArray!

this compiles but on accessing items from the collection you lose their type, so you need to cast
let firstCard = cards[0] as UIImageView
// or:
let firstCard: UIImageView = cards[0]